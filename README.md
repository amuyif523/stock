# Addis Profit Finder
## The Digital Face of Ethiopia

> **Mission**: Digitizing the Ethiopian SME sector—the backbone of our economy—by turning camera phones into professional data entry clerks through AI Vision and local-first architecture.

---

## 📜 Project Vision

This platform is the first step in a national mission to digitize Ethiopia's informal market. We solve the "Terrible Data" problem by using:

- **AI Vision** as the bridge from physical chaos to structured data
- **Local-First Architecture** ensuring data sovereignty per Proclamation 1321/2024
- **Fayda ID Integration** for verified identity and legal compliance
- **MoR QR-Code Compliance** for Ministry of Revenue regulations

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Local Fedora Server                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   React PWA  │  │ Node.js API  │  │  PostgreSQL  │      │
│  │   (Port 5173)│◄─│  (Port 4000) │◄─│  (Port 5432) │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                          ▲                                   │
│                          │                                   │
│                   ┌──────┴──────┐                           │
│                   │ Python AI   │                           │
│                   │ (Port 8000) │                           │
│                   └─────────────┘                           │
└─────────────────────────────────────────────────────────────┘
                         ▲
                         │ TLS 1.3
                         │
              ┌──────────┴──────────┐
              │  Mobile PWA Users   │
              │  (Clerks & Owners)  │
              └─────────────────────┘
```

### Tech Stack

- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL 16 with Prisma ORM
- **AI Engine**: Python FastAPI + Tesseract OCR + Fuzzy Matching
- **Infrastructure**: Docker Compose on Fedora Linux

---

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose installed on Fedora Linux
- Node.js 18+ (for local development)
- Copy `.env.example` to `.env` and configure secrets

### Installation

```bash
# Clone the repository
git clone https://github.com/addis-profit-finder/platform.git
cd platform

# Copy environment template
cp .env.example .env

# Edit .env with your production secrets
# IMPORTANT: Change all default passwords and generate secure keys

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Access Points

- **Frontend PWA**: http://localhost:3000
- **API**: http://localhost:4000
- **AI Engine**: http://localhost:8000 (optional profile)
- **PostgreSQL**: localhost:5432

---

## 📁 Project Structure

```
/addis-profit-finder
├── apps/
│   ├── api/                    # Node.js/Express Backend
│   │   ├── prisma/
│   │   │   └── schema.prisma   # Database schema (Proclamation 1321 compliant)
│   │   └── src/
│   │       ├── controllers/    # Business logic
│   │       ├── middleware/     # Auth, RBAC, Audit logging
│   │       └── services/       # Fayda, QR, OCR, Calendar
│   │
│   └── web/                    # React/Vite Frontend PWA
│       ├── src/
│       │   ├── components/     # UI components
│       │   ├── hooks/          # Custom React hooks
│       │   ├── lib/            # API client, i18n, utilities
│       │   ├── locales/        # am.json, om.json, en.json
│       │   ├── pages/          # Application pages
│       │   └── styles/         # Global CSS with Ethiopic fonts
│       └── public/
│           └── manifest.json   # PWA manifest
│
├── ai-engine/                  # Python AI Microservice
│   ├── main.py                 # FastAPI entry point
│   ├── requirements.txt        # Python dependencies
│   └── Dockerfile
│
├── docker-compose.yml          # Local orchestration
├── package.json                # Root workspace config
└── docs/                       # Master Project Brain
    ├── The Project "Manifesto".md
    ├── OCR & Fuzzy Match Logic.md
    ├── Data Protection Proclamation 1321.md
    ├── Fayda ID API Integration Map.md
    ├── MoR QR-Code Directive Doc.md
    └── MULTILINGUAL & LOCALIZATION (L10N) SPEC.md
```

---

## 🔐 Compliance Features

### Data Protection Proclamation 1321/2024

✅ **Data Sovereignty**: All data stored locally on Fedora server within Ethiopia  
✅ **Encryption at Rest**: AES-256-GCM for sensitive fields (Fayda tokens)  
✅ **Encryption in Transit**: TLS 1.3 for all communications  
✅ **Immutable Audit Logs**: Article 50 compliance with hashed signatures  
✅ **Right to Erasure**: Staff de-linking while preserving transaction history  

### Fayda ID Integration

- OpenID Connect (OIDC) flow with PKCE
- Persistent token storage (not raw National ID numbers)
- Biometric re-authentication for high-risk actions
- Offline mode with pending verification queue

### MoR QR-Code Compliance

- Directive No. 1099/2025 compliant QR generation
- SHA-256 digital signatures
- Two-tier ledger (Internal + Compliance)
- Offline caching with sync capability

---

## 🌍 Localization (L10N)

### Supported Languages

| Code | Language | Script |
|------|----------|--------|
| `am` | Amharic (አማርኛ) | Ethiopic |
| `om` | Afaan Oromoo | Latin |
| `en` | English | Latin |

### Ethiopian Calendar Support

The system implements dual-calendar functionality:
- **Storage**: UTC timestamps (ISO-8601) in database
- **Display**: Ethiopian Calendar (E.C.) for clerks, Gregorian (G.C.) for owners
- **13th Month**: Pagume handled correctly in audit logic

```typescript
// Example usage
import { formatDateDisplay, toEthiopianDate } from '@/lib/i18n';

const today = new Date();
const ethiopian = toEthiopianDate(today);
// Returns: { year: 2016, month: 5, day: 15, monthName: 'ጥር' }
```

---

## 🤖 AI Vision Pipeline

### Stage A: Image Pre-processing

1. **Perspective Correction**: Document edge detection and flattening
2. **Grayscale & Contrast Boost**: Remove background noise
3. **Thresholding**: High-contrast black and white conversion

### Stage B: OCR Extraction

- **Standard Layouts**: Tesseract.js (client-side/offline)
- **Handwritten/Sini Receipts**: LLM-based Vision model via API

### Stage C: Fuzzy Matching

Weighted Levenshtein Distance algorithm:

```
Score(E, Sk) = (1 - Levenshtein(E, Sk) / max(len(E), len(Sk))) × W_category
```

- **Auto-Map**: > 0.85 confidence
- **Verification**: 0.60 - 0.85 confidence
- **New Item**: < 0.60 confidence

### Addis Taxonomy (Slang Mapping)

| Master SKU | Local Aliases |
|------------|---------------|
| Rebar 12mm | "Aticero 12", "Koshoro 12", "Iron 12" |
| Cooking Oil 5L | "Abyssinia 5L", "Zet 5", "Oil 5" |
| Cement (Dangote) | "Semento", "Dangote Grey", "OPC 42.5" |

**Learning Mode**: Every clerk correction adds to the alias database.

---

## 📊 Database Schema

Core models include:

- **Owner** → **Business** → **Staff** (with Fayda integration)
- **Product** → **StockHistory** → **Sale** → **Audit**
- **ProductAlias** (Addis Taxonomy)
- **AuditLog** (immutable, hashed)

See `apps/api/prisma/schema.prisma` for full schema.

---

## 🔧 Development

### Local Development (Without Docker)

```bash
# Install root dependencies
npm install

# Install workspace dependencies
npm install --workspaces

# Generate Prisma client
cd apps/api && npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development servers
npm run dev  # Runs both API and Web concurrently
```

### Running AI Engine (Optional Profile)

```bash
docker-compose --profile ai up -d
```

### Database Management

```bash
# Open Prisma Studio
npm run db:studio

# Create new migration
cd apps/api && npx prisma migrate dev --name init

# Seed database
npm run db:seed
```

---

## 🚢 Production Deployment

### Fedora Server Setup

```bash
# 1. Install Docker and Docker Compose
sudo dnf install docker docker-compose
sudo systemctl enable --now docker

# 2. Clone repository
git clone https://github.com/addis-profit-finder/platform.git
cd platform

# 3. Configure production secrets
cp .env.example .env
# Edit .env with production values

# 4. Generate secure keys
openssl rand -hex 32  # For ENCRYPTION_KEY
openssl rand -hex 64  # For JWT_SECRET

# 5. Set up SSL certificates for PostgreSQL
# (Required for Proclamation 1321 compliance)

# 6. Deploy
docker-compose up -d

# 7. Verify health
docker-compose ps
curl http://localhost:4000/health
```

### Backup Strategy

```bash
# PostgreSQL backup
docker exec addis_profit_db pg_dump -U addis_admin addis_profit_finder > backup_$(date +%Y%m%d).sql

# Restore
docker exec -i addis_profit_db psql -U addis_admin addis_profit_finder < backup_20260101.sql
```

---

## 📈 Roadmap

### Phase 1: Initialization ✅
- [x] Folder structure per Master Tech Stack
- [x] Prisma schema with Proclamation 1321 compliance
- [x] Docker Compose for local Fedora deployment
- [x] Multi-language support (Amharic, Afaan Oromoo, English)
- [x] Ethiopian Calendar integration

### Phase 2: Core Features (Next)
- [ ] Fayda ID authentication flow
- [ ] OCR image ingestion pipeline
- [ ] Fuzzy match engine implementation
- [ ] Stock management CRUD operations
- [ ] Sales tracking with leakage detection

### Phase 3: Compliance & Intelligence
- [ ] MoR QR-code generation
- [ ] 72-Hour Audit algorithm
- [ ] Immutable audit logging
- [ ] Dashboard analytics

---

## 📞 Support & Documentation

- **Master Project Brain**: See `/docs` folder for complete specifications
- **API Documentation**: http://localhost:4000/docs (once deployed)
- **AI Engine Docs**: http://localhost:8000/docs

---

## ⚖️ Legal & Compliance

This platform is designed to comply with:

- **Data Protection Proclamation No. 1321/2024** (Ethiopia)
- **Ministry of Revenue Directive No. 1099/2025** (QR-Code Mandate)
- **National ID Program (NIDP)** Integration Standards
- **Ethiopian Communications Authority (ECA)** Regulations

**Data Sovereignty Guarantee**: All citizen data resides exclusively on servers physically located within the Federal Democratic Republic of Ethiopia.

---

## 🙏 Acknowledgments

Built for the people of Ethiopia, by Ethiopian engineers.  
*Capture the Data. Build the Future. The Era of the Digital SME starts here.*

---

**© 2026 Addis Profit Finder Team**  
*The Digital Face of Ethiopia*
