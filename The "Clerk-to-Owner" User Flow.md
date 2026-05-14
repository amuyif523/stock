CLERK-TO-OWNER USER FLOW: THE ADDIS PROFIT FINDER UX

Version: 1.0 (High-Speed Retail Optimization)

1. USER PERSONAS & PSYCHOLOGY

Persona

Environment

Primary Motivation

Tech Literacy

The Clerk

High-pressure, noisy, customer-facing.

Speed of transaction & avoiding errors.

Low to Moderate (Smartphone native).

The Owner

Remote (Home, Cafe, or Second Branch).

Security, profit margin, and staff trust.

Moderate to High.

2. THE CLERK JOURNEY: "THE 3-TAP RULE"

Goal: Every inventory move or sale must be recorded in 3 taps or less to prevent "transaction abandonment" during busy hours.

Flow A: Quick Sale (The "Sini" Digitalization)

Launch: Opens PWA on phone.

Action: Taps "Quick Scan" (Camera opens).

Recognition: AI Vision identifies item (e.g., "Rebar 12mm"). Clerk confirms quantity.

Finalize: Taps "Complete Sale." System generates the MoR-Compliant QR Code instantly.

Flow B: Incoming Supply (The "Ingestion")

Action: Taps "Add Stock."

Capture: Takes a photo of the wholesaler's manual receipt.

Verification: AI extracts items and quantities. Clerk verifies against physical count.

Sync: Taps "Confirm Ingest." Stock is added to the Product model.

3. THE OWNER JOURNEY: "THE COMMAND CENTER"

Goal: Provide a strategic overview that turns raw data into actionable profit recovery.

Flow C: The Remote Morning Brief

Login: Biometric auth (linked to Fayda) into the React Dashboard.

Pulse View: Sees the Daily Profit Velocity (DPV) across all branches.

$$DPV = \sum (Sale_{price} - Cost_{price})$$

Alert Check: Views "High Risk" flags (e.g., Price Overrides or Voids).

Flow D: The 72-Hour Audit Loop

Initiation: Taps "Start Audit."

Data Pull: System reconciles Supply vs. Sales records.

Discrepancy Reveal: Owner sees the Leakage Value ($L_v$)$.

$$L_v = (Expected\ Stock - Physical\ Stock) \times Master\ Price$$

Accountability: Clicks on a discrepancy to see which staffId (Fayda-verified) was on shift during the loss.

4. CRITICAL INTERACTION TOUCHPOINTS (THE "FRICTION")

Event

Required Action

Logic

Price Override

Clerk enters price < MasterPrice.

Triggers a push notification to the Owner's phone for instant approval/rejection.

Voiding Invoice

Clerk attempts to delete a sale.

Fayda Re-auth Required. Clerk must scan their ID to authorize the void for the audit trail.

Low Stock Alert

System detects quantity < SafetyThreshold.

Automatically adds the item to the Owner's "Procurement List" for the next wholesaler visit.

5. UI/UX DESIGN PRINCIPLES FOR ADDIS

Visual Over Text: Use icons for categories (e.g., a "Bolt" icon for hardware) to help less-literate staff navigate faster.

Offline Indicators: A prominent "Syncing" status bar. Clerks must know their data is safe even if the Ethio Telecom 4G drops.

Dark Mode by Default: To save battery life on phones during power outages ("load shedding") and for better visibility in dim warehouses.

High Contrast Success/Fail: Vibrant Green for success, "Ethiopian Red" for errors.

Bridging the Gap between the Shop Floor and the CEO's Desk.