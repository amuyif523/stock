MINISTRY OF REVENUE (MoR) QR-CODE DIRECTIVE

Version: 2026.1 (Directive No. 1099/2025 Compliance)

1. REGULATORY CONTEXT

As part of the Digital Ethiopia 2025 initiative, the Ministry of Revenue (MoR) has mandated that all commercial transactions—including those from formerly informal SMEs—must produce a digitally verifiable receipt. Non-compliance results in immediate daily administrative penalties and "Estimate Tax" assessments.

2. DATA REQUIREMENTS (THE PAYLOAD)

Every generated invoice/receipt within the Addis Profit Finder system must include the following data points encoded within the QR code and printed on the document:

Field Name

Format

Requirement

Merchant TIN

10-digit String

Mandatory

Invoice Number

Sequential/Unique

Mandatory

Transaction Date

ISO-8601

Mandatory

Total Amount

Float (ETB)

Mandatory

VAT Amount

15% (if applicable)

Conditional

TOT Amount

2% or 10%

Conditional

Verification URL

MoR Portal Link

Mandatory

Digital Signature

SHA-256 Hash

Mandatory

3. QR CODE SPECIFICATION

Version: QR Code Model 2.

Error Correction: Level M (15%) to account for potential physical damage to printed paper.

Physical Size: Minimum 2 cm x 2 cm on printed receipts.

Placement: Top-right header or bottom-center footer.

Payload Type: JSON-LD or Pipe-Delimited String (as per MoR API spec).

4. THE "SHADOW" COMPLIANCE LOGIC

To protect the user while ensuring transparency, the system follows a Two-Tier Ledger approach:

The Internal Ledger (Private): Stores all detailed "Merkato Reality" data, including informal names and broker margins.

The Compliance Ledger (Public): Formats data for the MoR API. If a sale is "Offline/Informal," the system flags it for the owner's manual reconciliation before generating the final QR-compliant receipt.

5. TECHNICAL INTEGRATION (PSEUDO-CODE)

import QRCode from 'qrcode';
import { createHash } from 'crypto';

async function generateMoRInvoice(saleData, merchantSecret) {
  // 1. Construct the Payload
  const payload = {
    tin: saleData.businessTin,
    inv: saleData.invoiceId,
    date: saleData.createdAt,
    amt: saleData.totalPrice,
    tax: saleData.taxAmount,
    url: `https://verify.mor.et/v1/${saleData.invoiceId}`
  };

  // 2. Generate Digital Signature (SHA-256)
  const signature = createHash('sha256')
    .update(JSON.stringify(payload) + merchantSecret)
    .digest('hex');

  // 3. Generate QR DataURL
  const qrContent = JSON.stringify({ ...payload, sig: signature });
  const qrCodeUrl = await QRCode.toDataURL(qrContent, { errorCorrectionLevel: 'M' });

  return { qrCodeUrl, signature };
}


6. SECURITY & AUDIT TRAIL (PROCLAMATION 1321)

Immutability: Once a QR code is generated and signed, the transaction record in the Sale model must be locked. Any changes require a "Void" transaction with a new QR code.

Fayda Linking: The staffId associated with the invoice generation must be recorded to provide an audit trail for the Ministry in case of disputes.

Offline Handling: If the internet is down, the system caches the signature and syncs with the MoR portal once the Fedora server detects a connection.

Standardizing the Digital Transaction Layer of Ethiopia.