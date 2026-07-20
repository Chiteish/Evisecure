from fastapi import APIRouter, File, UploadFile, HTTPException
import os
import shutil
from models.object_detector import detect_evidence_objects

router = APIRouter(prefix="/evidence", tags=["Evidence Analysis"])

# Ensure directories exist
UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

@router.post("/analyze-evidence")
async def analyze_evidence(file: UploadFile = File(...)):
    # Validate file type extension
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")

    # Paths for original upload and annotated output
    input_path = os.path.join(UPLOAD_DIR, file.filename)
    output_path = os.path.join(OUTPUT_DIR, f"annotated_{file.filename}")

    try:
        # Save uploaded file to disk
        with open(input_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Run detection pipeline
        detections = detect_evidence_objects(input_path, output_path)
        
        return {
            "status": "success",
            "filename": file.filename,
            "saved_output_visual": output_path,
            "objects": detections
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")