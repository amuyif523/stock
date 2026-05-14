THE LEAKAGE ALGORITHM: PROFIT RECOVERY ENGINE

Version: 1.0 (Audit-to-OS Pipeline)

1. THE OBJECTIVE

To identify "Unknown Loss" (theft, unrecorded sales, broker hijacking) and "Operational Waste" (dead stock, pricing errors) by triangulating three disparate data sources:

Supply Data ($S$): Purchase invoices and wholesale receipts.

Sales Data ($V$): Manual "Sini" receipts, Z-reports, and informal notebooks.

Physical Data ($P$): The "Ground Truth" stock count at the time of audit.

2. PHASE 1: DATA NORMALIZATION (FUZZY RECONCILIATION)

Before calculation, the "Garbage Data" must be cleaned. Because "iPhone 15," "iPhne," and "Apple Phone" may refer to the same SKU, we apply Normalized Levenshtein Distance (NLD).

The Logic:
For any record $R$, find the most probable SKU $S_k$ in the Master Inventory:


$$Match(R) = \max \left( 1 - \frac{Levenshtein(R, S_k)}{\max(len(R), len(S_k))} \right)$$

Threshold: If $Match(R) > 0.85$, auto-assign to SKU.

Exception: If $Match(R) < 0.85$, flag for manual owner verification.

3. PHASE 2: THE RECONCILIATION FORMULA (INVENTORY BALANCE)

We calculate the Expected Stock ($E$) and compare it to the Physical Stock ($P$).

The Formula:


$$E = I_{start} + \sum S - \sum V - \sum W$$

Where:

$I_{start}$: Starting inventory at beginning of audit period.

$\sum S$: Total units purchased/added.

$\sum V$: Total units sold (according to receipts).

$\sum W$: Documented waste/damage/returns.

The Leakage Calculation ($L$):


$$L = E - P$$

If $L > 0$: This represents Unknown Loss (theft or unrecorded sales).

If $L < 0$: This represents Administrative Error (over-counting or untracked supply arrival).

4. PHASE 3: THE FINANCIAL IMPACT (THE "FOUND MONEY")

We translate unit leakage into the actual currency ($ETB$) that the owner is losing.

Total Recovery Value ($TRV$):


$$TRV = (L \times UnitPrice) + (V_{dead} \times k) + (V_{price\_leak})$$

The Theft Leakage ($L \times Price$): Direct cash value of missing items.

The Dead Stock Unlock ($V_{dead} \times k$):

Items with zero velocity for $>90$ days.

$k$: The opportunity cost coefficient (weighted by inflation/Birr fluctuation).

The Price Hijack ($V_{price\_leak}$):

Occurs when $Price_{actual} < Price_{master}$.

$V_{price\_leak} = \sum (Price_{master} - Price_{actual})$ for all sales where brokers or staff "discounted" without authorization.

5. PHASE 4: THE REPORTING LOGIC

The output for the owner must be structured to drive immediate action.

The Red Alert: Top 3 SKUs by Leakage Value (Where the theft is highest).

The "Ghost" Shifts: Correlation between leakage events and specific staff schedules (Fayda ID linking).

The Cash Injection: Specific items to "Fire Sale" to recover locked capital.

6. TECHNICAL IMPLEMENTATION (PSEUDO-CODE)

// Core Logic for Node.js Implementation
function calculateLeakage(skuId, physicalCount, startDate, endDate) {
  const supply = db.supply.sum('quantity').where({ skuId, date: between(startDate, endDate) });
  const sales = db.sales.sum('quantity').where({ skuId, date: between(startDate, endDate) });
  const waste = db.waste.sum('quantity').where({ skuId, date: between(startDate, endDate) });
  const starting = db.inventoryHistory.find(skuId, startDate);

  const expectedStock = starting + supply - sales - waste;
  const leakageUnits = expectedStock - physicalCount;
  
  const unitPrice = db.skus.find(skuId).sellingPrice;
  const leakageValue = leakageUnits * unitPrice;

  return {
    unitsLost: leakageUnits,
    etbLost: leakageValue,
    severity: leakageValue > 5000 ? 'HIGH' : 'LOW'
  };
}


Turning Paper Chaos into Financial Proof.