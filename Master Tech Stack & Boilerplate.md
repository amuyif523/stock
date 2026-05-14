MASTER TECH STACK & BOILERPLATE: ADDIS PROFIT FINDER

Version: 1.0 (2026 Strategy)

1. ARCHITECTURE OVERVIEW

To support the mission of "Digital Sovereignty," the architecture follows a Local-First, Cloud-Sync model. The primary logic and data reside on local Fedora servers within Ethiopia, with an optional encrypted sync to a central monitoring dashboard.

Primary Stack: Node.js (Backend) + React (Frontend) + PostgreSQL (Database).

Infrastructure: Fedora Linux (Server & Dev Environment).

Design Pattern: Modular Monolith (to allow for rapid expansion into HR, Sales, and AI modules).

2. BACKEND LAYER (THE CORE)

Environment: Node.js (LTS).

Framework: Express.js or Fastify (High-performance API).

ORM: Prisma (Essential for type-safe database interactions).

Identity: OAuth 2.0 / OpenID Connect (For Fayda ID integration).

Compliance: QR Code generation library (compliant with Directive 1099/2025).

3. FRONTEND LAYER (THE FACE)

Framework: React 18+ (Vite as the build tool).

Styling: Tailwind CSS (Rapid UI development with a "Modern Era" aesthetic).

State Management: TanStack Query (React Query) for data fetching and synchronization.

Mobile-First: PWA (Progressive Web App) capabilities for camera-based ingestion in the field.

4. DATA LAYER (THE SOVEREIGNTY)

Database: PostgreSQL (Relational data).

Storage: Local file system (Fedora) for encrypted image storage.

Search/Analysis: Python (FastAPI) as a microservice for specialized data analysis and fuzzy matching if Node.js performance peaks.

Sovereignty Rule: All PROCLAMATION_1321 sensitive data must be stored in the et_local_db schema.

5. AI & INGESTION PIPELINE (THE TROJAN HORSE)

OCR: Tesseract.js (for client-side/offline text extraction).

Image Recognition: Integration with Google Vision API or a localized LLM (via API) for "Merkato Reality" categorization.

Fuzzy Matching: Custom Levenshtein Distance logic to normalize "Garbage Data" (e.g., "iPhne" -> "iPhone").

6. PROJECT BOILERPLATE STRUCTURE

/addis-profit-finder
├── /apps
│   ├── /api (Node.js/Express)
│   │   ├── /prisma (Schema & Migrations)
│   │   ├── /src/controllers (Business Logic)
│   │   ├── /src/middleware (Fayda/Security)
│   │   └── /src/services (AI/OCR Integration)
│   └── /web (React/Vite)
│       ├── /src/components (UI Dashboard)
│       ├── /src/hooks (Data Fetching)
│       └── /src/pages (Audit, Inventory, Vision)
├── /ai-engine (Python Microservice - Optional)
├── docker-compose.yml (Local Fedora Deployment)
└── README.md


7. KEY TECHNICAL CONSTRAINTS

Latency: The system must be usable offline. Local operations (OCR/Data Entry) should have a latency of $< 100ms$.

Encryption: All data at rest must use AES-256. All transmission must be over TLS 1.3.

Auditability: Every transaction must have an immutable log entry linked to a fayda_id token.

Standardizing the Digital Infrastructure of Ethiopia.