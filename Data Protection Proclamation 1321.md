DATA PROTECTION COMPLIANCE (PROCLAMATION NO. 1321/2024)

Version: 2026.1 (Ethiopian Communications Authority Alignment)

1. REGULATORY CONTEXT

In 2024, Ethiopia enacted Proclamation 1321 to regulate the processing of personal data. As a "Data Controller" (for the staff) and a "Data Processor" (for the business owner), the Addis Profit Finder must adhere to strict principles of privacy by design. Non-compliance results in administrative fines of up to $1\%$ of annual turnover or criminal liability.

2. CORE DATA PRINCIPLES (THE "RULES OF ENGAGEMENT")

Purpose Limitation: Data collected for inventory and theft prevention (Fayda tokens) cannot be repurposed for marketing without explicit consent.

Data Minimization: We only store the persistent faydaToken, not the raw National ID number.

Storage Limitation: Financial records and staff logs must be retained for at least 10 years per commercial law, but biometric-linked tokens must be erasable upon staff termination (Right to be Forgotten).

3. DATA SOVEREIGNTY (THE "ADDIS RULE")

Article 44 Requirement: Personal data of Ethiopian citizens must be stored on servers located within the borders of Ethiopia.

Technical Implementation: Our Fedora-based local-first architecture is the primary compliance mechanism.

Cloud Restriction: Any "Sync to Cloud" feature for the Owner's dashboard must use an Ethiopian data center (e.g., Ethio Telecom Cloud or local Washa providers). Data must not be hosted on AWS (US), Azure (EU), or Heroku (US) without explicit ECA authorization.

4. DATA SECURITY STANDARDS (ARTICLE 41)

The Proclamation mandates "Appropriate Technical and Organizational Measures."

Encryption at Rest: All personal data in the PostgreSQL database (Staff names, Fayda tokens) must be encrypted using AES-256-GCM.

Encryption in Transit: All traffic between the PWA and the Fedora server must utilize TLS 1.3.

Access Control: Implementing Role-Based Access Control (RBAC) via the Prisma schema to ensure Clerks cannot view Owner-level financial reports.

5. DATA SUBJECT RIGHTS (UI/UX REQUIREMENTS)

The system must provide interfaces for the following legal requirements:

Right to Access: A "Data Export" button for staff to see what information the system holds about them.

Right to Rectification: Ability to update staff profiles if Fayda details change.

Right to Erasure: A formal "De-linking" process for staff who leave the business, where their personal data is anonymized while the transaction history remains for the audit.

6. THE 72-HOUR BREACH PROTOCOL (ARTICLE 43)

In the event of a security breach (e.g., unauthorized access to the Fedora server):

Detection: System logs must flag unauthorized DB access attempts.

Notification: The Owner must be notified immediately via the dashboard.

Authority Report: We must provide a technical summary of the breach to the Ethiopian Communications Authority (ECA) within 72 hours.

7. AUDIT LOGS & ACCOUNTABILITY (ARTICLE 50)

The system must maintain an Immutable Audit Log that cannot be deleted by the Owner or the Clerk.

Log Contents: Timestamp, Actor_ID (Fayda-linked), Action_Type (Read/Write/Delete), Impacted_Resource.

Integrity: Logs should be hashed periodically to ensure they haven't been tampered with.

Privacy by Design. Sovereignty by Law.