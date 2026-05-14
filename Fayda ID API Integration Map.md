FAYDA ID (NATIONAL ID) API INTEGRATION MAP

Version: 2026.1 (Proclamation 1321 & NIDP Compliance)

1. ARCHITECTURAL OVERVIEW

The integration follows the OpenID Connect (OIDC) standard provided by the National ID Program (NIDP) of Ethiopia. The goal is to create an immutable link between a physical staff member and their digital actions within the Addis Profit Finder system.

2. AUTHENTICATION FLOW (OIDC)

We utilize the Authorization Code Flow with PKCE to ensure maximum security for mobile and web clients.

Initiation: Staff member clicks "Verify with Fayda" on the React mobile dashboard.

Redirect: User is redirected to https://id.fayda.et/authorize with scopes: openid profile ekyc.

Consent: Staff provides biometric or OTP consent on the official Fayda portal.

Callback: NIDP redirects back to the Fedora server with an authorization_code.

Token Exchange: The Node.js backend exchanges the code for an id_token and access_token using the client_secret.

Verification: The backend validates the JWT signature using NIDP's public keys.

3. DATA SCOPES & MAPPING

To comply with Proclamation 1321, we only request and store the minimum necessary data.

Scope

Data Field

System Usage

openid

sub (Subject)

Unique persistent identifier (Tokenized).

profile

given_name

Display name on invoices/audits.

ekyc

photo

Used for "Face-Match" verification during high-value audits.

ekyc

fin_hash

The hashed Fayda Identification Number for legal audit trails.

4. DATA SOVEREIGNTY & STORAGE (PROCLAMATION 1321)

We do not store the raw Fayda Number (FIN). We store a Persistent Token provided by the API.

Hashing: The sub from Fayda is salted and hashed before being stored in the Staff.faydaToken field in the Prisma schema.

Encryption: The faydaToken column in PostgreSQL must be encrypted at rest using AES-256-GCM.

Location: All identity-linked data must reside on the Local Fedora Server within Ethiopian borders.

5. TECHNICAL IMPLEMENTATION (PSEUDO-CODE)

// Node.js Service for Fayda Verification
import { Issuer, generators } from 'openid-client';

async function handleFaydaCallback(params, session) {
  const faydaIssuer = await Issuer.discover('https://id.fayda.et/.well-known/openid-configuration');
  const client = new faydaIssuer.Client({
    client_id: process.env.FAYDA_CLIENT_ID,
    client_secret: process.env.FAYDA_CLIENT_SECRET,
    redirect_uris: ['https://app.addisprofit.et/auth/fayda/callback'],
    response_types: ['code'],
  });

  const code_verifier = session.code_verifier;
  const tokenSet = await client.callback(
    'https://app.addisprofit.et/auth/fayda/callback',
    params,
    { code_verifier }
  );

  const claims = tokenSet.claims();
  
  // Create an immutable link in our database
  return await db.staff.update({
    where: { id: session.staffId },
    data: {
      faydaToken: claims.sub, // The persistent token
      isVerified: true,
      name: `${claims.given_name} ${claims.family_name}`
    }
  });
}


6. TRIGGER-BASED VERIFICATION (THE "ANTI-THEFT" LOGIC)

The system invokes Fayda re-authentication for high-risk actions:

Voiding an Invoice: Requires biometric re-auth.

Manual Stock Adjustment: Any adjustment $> 5,000$ ETB requires a fresh Fayda token.

Price Overrides: If a clerk discounts an item below the Product.masterPrice.

7. ERROR HANDLING & OFFLINE MODE

NIDP Down: If the National ID servers are unreachable, the system caches the local staff session but flags all transactions as "Pending Verification."

Retry Logic: The Fedora server attempts to re-verify pending tokens every 60 minutes once connectivity to the NIDP backbone is restored.

Verified Identity. Verified Profit.