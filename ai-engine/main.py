"""
AI Engine for Addis Profit Finder
OCR & Fuzzy Match Logic Implementation
Per "OCR & Fuzzy Match Logic.md" specification

This microservice handles:
- Image preprocessing (perspective correction, thresholding)
- OCR extraction (Tesseract + optional LLM vision)
- Fuzzy matching with weighted Levenshtein distance
- "Addis Taxonomy" slang-to-standard mapping
"""

from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import json
import os

# Import AI services (to be implemented)
# from services.ocr_processor import process_image_ocr
# from services.fuzzy_matcher import match_item_to_inventory
# from services.taxonomy_learner import learn_alias

app = FastAPI(
    title="Addis Profit Finder AI Engine",
    description="OCR and Fuzzy Matching Service for Ethiopian SME Digitization",
    version="1.0.0",
)

# CORS middleware for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class OCRResult(BaseModel):
    """OCR extraction result structure"""
    extracted_text: str
    confidence: float
    items: List[Dict[str, Any]]
    raw_data: Optional[Dict[str, Any]] = None


class FuzzyMatchRequest(BaseModel):
    """Request for fuzzy matching"""
    extracted_text: str
    business_id: str
    category: Optional[str] = None


class FuzzyMatchResponse(BaseModel):
    """Fuzzy match result"""
    product_id: Optional[str]
    product_name: str
    confidence: float
    requires_verification: bool
    matched_alias: Optional[str] = None


class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    service: str
    version: str


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health endpoint for container orchestration"""
    return {
        "status": "healthy",
        "service": "addis-profit-ai-engine",
        "version": "1.0.0"
    }


@app.post("/ocr/process", response_model=OCRResult)
async def process_ocr(
    image: UploadFile = File(...),
    language: str = Form(default="amh+eng"),  # Amharic + English
    enhance: bool = Form(default=True)
):
    """
    Process uploaded image through OCR pipeline
    
    Stage A: Image Pre-processing
    - Perspective correction
    - Grayscale & contrast boost
    - Thresholding
    
    Stage B: OCR Extraction
    - Tesseract for standard layouts
    - LLM Vision for handwritten/Sini receipts
    """
    try:
        # Validate file type
        if not image.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read image data
        image_data = await image.read()
        
        # TODO: Implement image preprocessing
        # enhanced_image = preprocess_image(image_data, enhance=enhance)
        
        # TODO: Implement OCR extraction
        # ocr_result = await extract_text(enhanced_image, language=language)
        
        # Placeholder response
        return OCRResult(
            extracted_text="Sample OCR Text - To be implemented",
            confidence=0.95,
            items=[
                {
                    "name": "Sample Product",
                    "quantity": 10,
                    "unit": "pcs",
                    "confidence": 0.92
                }
            ],
            raw_data={"filename": image.filename}
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR processing failed: {str(e)}")


@app.post("/ocr/fuzzy-match", response_model=FuzzyMatchResponse)
async def fuzzy_match(request: FuzzyMatchRequest):
    """
    Match extracted text to inventory using Weighted Levenshtein Distance
    
    Per OCR & Fuzzy Match Logic.md:
    - Score(E, Sk) = (1 - Levenshtein(E, Sk) / max(len(E), len(Sk))) * W_category
    - Auto-Map Threshold: > 0.85
    - Verification Threshold: 0.60 - 0.85
    - New Item Discovery: < 0.60
    """
    try:
        # TODO: Implement fuzzy matching logic
        # from services.fuzzy_matcher import match_item_to_inventory
        # result = await match_item_to_inventory(
        #     request.extracted_text,
        #     request.business_id,
        #     request.category
        # )
        
        # Placeholder response demonstrating the logic
        extracted = request.extracted_text.lower()
        
        # Simulate matching (to be replaced with actual DB lookup)
        sample_products = [
            {"id": "prod_1", "name": "Rebar 12mm", "aliases": ["aticero 12", "koshoro 12", "iron 12"]},
            {"id": "prod_2", "name": "Cooking Oil 5L", "aliases": ["abyssinia 5l", "zet 5", "oil 5"]},
            {"id": "prod_3", "name": "Cement Dangote", "aliases": ["semento", "dangote grey", "opc 42.5"]},
        ]
        
        best_match = None
        highest_score = 0.0
        matched_alias = None
        
        for product in sample_products:
            # Check main name
            score = calculate_similarity(extracted, product["name"].lower())
            
            # Check aliases (Addis Taxonomy)
            for alias in product["aliases"]:
                alias_score = calculate_similarity(extracted, alias.lower())
                if alias_score > score:
                    score = alias_score
                    matched_alias = alias
            
            if score > highest_score:
                highest_score = score
                best_match = product
        
        if best_match is None:
            raise HTTPException(status_code=404, detail="No matching product found")
        
        requires_verification = highest_score < 0.85
        
        return FuzzyMatchResponse(
            product_id=best_match["id"],
            product_name=best_match["name"],
            confidence=highest_score,
            requires_verification=requires_verification,
            matched_alias=matched_alias
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Fuzzy matching failed: {str(e)}")


def calculate_similarity(s1: str, s2: str) -> float:
    """
    Calculate similarity score using Levenshtein distance
    Score = 1 - (distance / max(len(s1), len(s2)))
    """
    # TODO: Replace with fastest-levenshtein or RapidFuzz implementation
    if s1 == s2:
        return 1.0
    
    max_len = max(len(s1), len(s2))
    if max_len == 0:
        return 1.0
    
    # Simple character-based similarity (placeholder)
    min_len = min(len(s1), len(s2))
    matches = sum(1 for i in range(min_len) if s1[i] == s2[i])
    
    return matches / max_len


@app.post("/taxonomy/learn")
async def learn_new_alias(
    product_id: str = Form(...),
    alias: str = Form(...),
    clerk_correction: bool = Form(default=False)
):
    """
    Learn new alias from clerk corrections
    Implements the "Learning Mode" from OCR & Fuzzy Match Logic.md
    
    Every time a Clerk manually corrects a fuzzy match,
    the system adds that string as an alias to improve future matches.
    """
    try:
        # TODO: Implement taxonomy learning
        # await add_product_alias(product_id, alias, source="clerk_correction")
        
        return {
            "status": "success",
            "message": f"Alias '{alias}' learned for product {product_id}",
            "clerk_correction": clerk_correction
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to learn alias: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
