OCR & FUZZY MATCH LOGIC: THE "DATA CLEANER"

Version: 1.0 (2026 "Merkato Reality" Engine)

1. THE PROBLEM: "GARBAGE IN, GOLD OUT"

In the Ethiopian SME market, data entry is the primary barrier to digitization. Manual typing is too slow, and raw OCR (Optical Character Recognition) often fails due to:

Handwritten "Sini" Receipts: Inconsistent handwriting and non-standard layouts.

Localized Slang: One item might be called "Rebar 12mm," "Aticero 12," or "Iron 12" by different clerks.

Physical Degradation: Dusty, crumpled, or oil-stained receipts common in warehouses.

Our system uses a Multi-Stage Ingestion Pipeline to normalize this chaos.

2. THE INGESTION PIPELINE (STEP-BY-STEP)

Stage A: Image Pre-processing (Client-Side PWA)

To save bandwidth and improve accuracy, the PWA (React) performs initial cleanup:

Perspective Correction: Automatic document edge detection and "flattening."

Grayscale & Contrast Boost: Removing background noise and highlights.

Thresholding: Converting the image to high-contrast black and white.

Stage B: OCR Extraction (Hybrid Engine)

We use a two-tier approach depending on the complexity:

Standard Layouts (Wholesale Invoices): Tesseract.js (local) or Google Vision API to extract key-value pairs (Item, Qty, Total).

Handwritten/Complex Layouts (Sini Receipts): A specialized LLM-based Vision model (via API) prompted to "Act as an Ethiopian Accountant" to interpret messy handwriting and return structured JSON.

3. THE FUZZY MATCH ENGINE (NORMALIZATION)

Once raw text is extracted, it must be mapped to the Product model in the Prisma schema. We use a Weighted Levenshtein Distance algorithm.

The Normalization Logic:
For an extracted string $E$ (e.g., "iPhne 15 Blue"), find the most probable SKU $S_k$ in the Business Inventory.

$$Score(E, S_k) = \left( 1 - \frac{Levenshtein(E, S_k)}{\max(len(E), len(S_k))} \right) \times W_{category}$$

$W_{category}$: A weight multiplier if the OCR-detected category matches the SKU category.

Auto-Map Threshold: $> 0.85$ (System automatically links the sale to the SKU).

Verification Threshold: $0.60 - 0.85$ (Clerk is prompted: "Did you mean iPhone 15 Blue?").

New Item Discovery: $< 0.60$ (System flags this as a "New Item" for the Owner to categorize).

4. THE "ADDIS TAXONOMY" (LOCAL SLANG MAPPING)

The system maintains a ProductAlias table to handle local industry-specific synonyms.

Master SKU

Local Aliases (Slang)

Rebar 12mm

"Aticero 12", "Koshoro 12", "Iron 12"

Cooking Oil 5L

"Abyssinia 5L", "Zet 5", "Oil 5"

Cement (Dangote)

"Semento", "Dangote Grey", "OPC 42.5"

Learning Mode: Every time a Clerk manually corrects a fuzzy match, the system adds that string as an alias to the Product model to improve future matches.

5. TECHNICAL IMPLEMENTATION (PSEUDO-CODE)

import { distance } from 'fastest-levenshtein';

async function matchItemToInventory(extractedText, businessId) {
  const masterList = await db.product.findMany({ where: { businessId } });
  
  let bestMatch = null;
  let highestScore = 0;

  for (const product of masterList) {
    const score = 1 - (distance(extractedText, product.name) / Math.max(extractedText.length, product.name.length));
    
    // Check aliases
    const aliasScore = product.aliases.map(a => 1 - (distance(extractedText, a) / Math.max(extractedText.length, a.length)));
    const finalScore = Math.max(score, ...aliasScore);

    if (finalScore > highestScore) {
      highestScore = finalScore;
      bestMatch = product;
    }
  }

  return {
    product: bestMatch,
    confidence: highestScore,
    requiresVerification: highestScore < 0.85
  };
}


6. HUMAN-IN-THE-LOOP (UI REQUIREMENTS)

To ensure 100% accuracy for the 72-Hour Audit:

The "Check Mark" UI: On the PWA, clerks see the OCR result overlaying the original photo.

Color-Coded Confidence:

Green: Confirmed match.

Yellow: Needs tap-to-confirm.

Red: Manual entry required (System learns from this entry).

Turning Paper Chaos into Structured Intelligence.