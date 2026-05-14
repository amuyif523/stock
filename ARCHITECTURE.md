# Addis Profit Finder - Directory Structure
# The Digital Face of Ethiopia

/addis-profit-finder
├── README.md                          # Project overview and setup instructions
├── package.json                       # Root workspace configuration
├── docker-compose.yml                 # Local Fedora server orchestration
├── .env.example                       # Environment template (copy to .env)
├── .gitignore                         # Git ignore rules
│
├── /apps                              # Application workspaces
│   ├── /api                           # Node.js/Express Backend
│   │   ├── package.json               # API dependencies
│   │   ├── tsconfig.json              # TypeScript configuration
│   │   ├── Dockerfile                 # API container definition
│   │   ├── /prisma                    # Database layer
│   │   │   └── schema.prisma          # Prisma ORM schema (Proclamation 1321 compliant)
│   │   └── /src
│   │       ├── index.ts               # Express app entry point
│   │       ├── /controllers           # Business logic controllers
│   │       │   ├── auth.controller.ts # Fayda ID authentication
│   │       │   ├── product.controller.ts
│   │       │   ├── sale.controller.ts
│   │       │   ├── audit.controller.ts
│   │       │   └── ocr.controller.ts  # Image ingestion pipeline
│   │       ├── /middleware            # Security & compliance middleware
│   │       │   ├── auth.middleware.ts # JWT + Fayda verification
│   │       │   ├── rbac.middleware.ts # Role-based access control
│   │       │   ├── audit.middleware.ts # Immutable logging
│   │       │   └── encryption.middleware.ts # AES-256-GCM
│   │       └── /services              # Core services
│   │           ├── fayda.service.ts   # National ID integration
│   │           ├── qr.service.ts      # MoR QR-code generation
│   │           ├── fuzzy-match.service.ts # Levenshtein distance engine
│   │           ├── ethiopian-calendar.service.ts # E.C. <-> G.C. conversion
│   │           └── ocr.service.ts     # Tesseract/Vision integration
│   │
│   └── /web                           # React/Vite Frontend PWA
│       ├── package.json               # Web dependencies
│       ├── vite.config.ts             # Vite build configuration
│       ├── tailwind.config.js         # Tailwind CSS with Ethiopic fonts
│       ├── postcss.config.js          # PostCSS configuration
│       ├── tsconfig.json              # TypeScript configuration
│       ├── index.html                 # PWA entry point
│       ├── /public
│       │   └── manifest.json          # PWA manifest
│       └── /src
│           ├── main.tsx               # React entry point
│           ├── App.tsx                # Main application component
│           ├── /components            # Reusable UI components
│           │   ├── ui/                # Base components (Button, Input, etc.)
│           │   ├── layout/            # Layout components (Header, Sidebar)
│           │   ├── inventory/         # Stock management components
│           │   ├── sales/             # Point-of-sale components
│           │   ├── audit/             # Audit dashboard components
│           │   └── ocr/               # Camera/OCR interface components
│           ├── /hooks                 # Custom React hooks
│           │   ├── useFaydaAuth.ts    # Fayda authentication hook
│           │   ├── useInventory.ts    # Inventory data fetching
│           │   ├── useOCR.ts          # Image processing hook
│           │   └── useEthiopianDate.ts # Calendar conversion hook
│           ├── /pages                 # Application pages
│           │   ├── Dashboard.tsx
│           │   ├── Inventory.tsx
│           │   ├── Sales.tsx
│           │   ├── Audit.tsx
│           │   ├── OCRScan.tsx        # Camera ingestion page
│           │   └── Settings.tsx
│           ├── /locales               # i18n translations
│           │   ├── am.json            # Amharic (አማርኛ)
│           │   ├── om.json            # Afaan Oromoo
│           │   └── en.json            # English
│           ├── /lib                   # Utility libraries
│           │   ├── api.ts             # Axios instance
│           │   ├── i18n.ts            # i18next configuration
│           │   ├── ethiopian-date.ts  # Date conversion utilities
│           │   └── utils.ts           # General helpers
│           └── /styles                # Global styles
│               └── globals.css        # Tailwind + Ethiopic font imports
│
├── /ai-engine                         # Python AI Microservice (Optional)
│   ├── Dockerfile                     # Python container definition
│   ├── requirements.txt               # Python dependencies
│   ├── main.py                        # FastAPI entry point
│   ├── /models                        # ML models for OCR/fuzzy matching
│   ├── /services                      # AI services
│   │   ├── ocr_processor.py           # Advanced OCR pipeline
│   │   ├── fuzzy_matcher.py           # Enhanced fuzzy matching
│   │   └── taxonomy_learner.py        # Slang-to-standard mapping
│   └── /utils                         # Utilities
│       └── image_preprocessing.py     # Perspective correction, thresholding
│
└── /docs                              # Documentation (Master Project Brain)
    ├── The Project "Manifesto".md
    ├── OCR & Fuzzy Match Logic.md
    ├── Data Protection Proclamation 1321.md
    ├── Master Tech Stack & Boilerplate.md
    ├── Prisma Schema (v1).md
    ├── Fayda ID API Integration Map.md
    ├── MoR QR-Code Directive Doc.md
    ├── MULTILINGUAL & LOCALIZATION (L10N) SPEC.md
    ├── The "Leakage" Algorithm.md
    └── The "Clerk-to-Owner" User Flow.md
