// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "postgresql"
url      = env("DATABASE_URL")
}

// --- CORE MODELS ---

model Owner {
id        String   @id @default(uuid())
email     String   @unique
name      String?
business  Business?
createdAt DateTime @default(now())
}

model Business {
id           String   @id @default(uuid())
name         String
location     String?
ownerId      String   @unique
owner        Owner    @relation(fields: [ownerId], references: [id])
products     Product[]
staff        Staff[]
audits       Audit[]
}

model Staff {
id            String   @id @default(uuid())
name          String
role          Role     @default(CLERK)
businessId    String
business      Business @relation(fields: [businessId], references: [id])

// FAYDA INTEGRATION (Proclamation 1321 Compliance)
faydaToken    String   @unique // The encrypted persistent token from Fayda
isVerified    Boolean  @default(false)

sales         Sale[]
wasteLogs     WasteLog[]
createdAt     DateTime @default(now())
}

enum Role {
OWNER
MANAGER
CLERK
}

// --- INVENTORY MODELS ---

model Product {
id            String   @id @default(uuid())
sku           String?  @unique // Standardized via Fuzzy Match logic
name          String   // The "Merkato Name" (e.g., "iPhone 15 Blue")
category      String?
unit          String   @default("pcs") // pcs, kg, m, etc.

// Pricing Strategy
masterPrice   Float    // The "Master Price" for the shop
costPrice     Float    // Buying price from supplier

businessId    String
business      Business @relation(fields: [businessId], references: [id])

stockHistory  StockHistory[]
supplies      Supply[]
sales         Sale[]
wasteLogs     WasteLog[]

createdAt     DateTime @default(now())
updatedAt     DateTime @updatedAt
}

model StockHistory {
id            String   @id @default(uuid())
productId     String
product       Product  @relation(fields: [productId], references: [id])
quantity      Float
snapshotDate  DateTime @default(now()) // Used as I_start for audits
}

// --- TRANSACTION MODELS (The Leakage Algorithm Inputs) ---

model Sale {
id            String   @id @default(uuid())
productId     String
product       Product  @relation(fields: [productId], references: [id])
quantity      Float

// Price Leakage Tracking
unitPrice     Float    // The actual price sold (to compare vs Product.masterPrice)
totalPrice    Float

staffId       String
staff         Staff    @relation(fields: [staffId], references: [id])

date          DateTime @default(now())
}

model Supply {
id            String   @id @default(uuid())
productId     String
product       Product  @relation(fields: [productId], references: [id])
quantity      Float
unitCost      Float
supplierName  String?
date          DateTime @default(now())
}

model WasteLog {
id            String   @id @default(uuid())
productId     String
product       Product  @relation(fields: [productId], references: [id])
quantity      Float
reason        String?  // Damage, Expiry, Theft
staffId       String
staff         Staff    @relation(fields: [staffId], references: [id])
date          DateTime @default(now())
}

// --- AUDIT & INTELLIGENCE ---

model Audit {
id              String   @id @default(uuid())
businessId      String
business        Business @relation(fields: [businessId], references: [id])

startDate       DateTime
endDate         DateTime @default(now())

// The Algorithm Outputs
expectedStock   Float
physicalStock   Float    // Entered via camera/manual check
leakageUnits    Float    // Expected - Physical
leakageValueETB Float    // leakageUnits * Product.masterPrice
priceLeakageETB Float    // Sum of (MasterPrice - ActualPrice) for sales

severity        Severity @default(LOW)
isResolved      Boolean  @default(false)
}

enum Severity {
LOW
MEDIUM
HIGH
}