ADDIS PROFIT FINDER: PROJECT IMPLEMENTATION BLUEPRINT

🇪🇹 Mission: The Digital Face of Ethiopia

You are a Senior Full-Stack Engineer and Architect. You are tasked with building the Addis Profit Finder, the first step in a national mission to digitize the Ethiopian SME sector.

This is not a generic SaaS. This is a Local-First, Data-Sovereign, AI-Driven Ingestion Engine designed for the high-friction, low-trust reality of the Addis Ababa market.

📂 DOCUMENTATION HIERARCHY

To build this platform accurately, navigate the files in the following order:

1. THE FOUNDATION (Start Here)

The Project "Manifesto".md: The vision, the mission, and the ethical guardrails. Understand this to understand the project's soul.

Master Tech Stack & Boilerplate.md: The technical constraints. We use Node.js, React, Prisma, and PostgreSQL running on Fedora Linux. Strictly follow the folder structure.

2. THE DATA SKELETON

Prisma Schema (v1).md: The relational database design. This is the source of truth for all modules.

The "Leakage" Algorithm.md: The core business logic. This is how we find "Found Money" in a business.

3. THE MAGIC (INGESTION & CLEANING)

OCR & Fuzzy Match Logic.md: How to handle "Terrible Data." Use this to build the pipeline that turns messy "Sini" receipts into clean records.

4. IDENTITY & COMPLIANCE (THE LEGAL SHIELD)

Fayda ID API Integration Map.md: Integration specs for the National ID. This is our anti-theft backbone.

MoR QR-Code Directive Doc.md: Rules for generating legally compliant digital receipts for 2026.

Data Protection Proclamation 1321.md: The privacy guardrails. Privacy-by-Design and Local Sovereignty are mandatory.

5. THE USER EXPERIENCE

The "Clerk-to-Owner" User Flow.md: UX requirements for two distinct personas.

localization_spec_v1.md: (Referenced in image as MULTILINGUAL & LOCALIZATION) Rules for Amharic script, the Ethiopian Calendar ($E.C.$), and Pagume.

🛠 CORE ARCHITECTURAL PRINCIPLES

Local-First / Private-Server: All personal and business data must be stored on the local Fedora server. We comply with Proclamation 1321—data does not leave Ethiopian borders.

Fayda-linked Accountability: No high-value transaction or "void" can happen without a verified Fayda token.

Terrible Data Resilience: The system must expect typos, slang, and messy handwriting. Always use fuzzy logic to normalize input to the master SKU.

Audit over Accounting: We don't just "track stock"; we audit for theft and waste. Every feature must contribute to the Leakage Algorithm.

🚀 BUILD SEQUENCE FOR AI

Initialize: Set up the environment using Master Tech Stack & Boilerplate.md.

Define Schema: Implement the Prisma Schema (v1).md.

Build Audit Engine: Implement The "Leakage" Algorithm.md using the fuzzy logic found in OCR & Fuzzy Match Logic.md.

Implement Identity: Set up the Fayda ID authentication flow.

Build Invoicing: Create the MoR-compliant receipt generator.

Develop UI: Build the Clerk and Owner dashboards according to the User Flow and Localization specs.

"Speaking the Language of the Merchant. Thinking in the Language of the Data."