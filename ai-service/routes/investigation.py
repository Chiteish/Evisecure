from fastapi import APIRouter, UploadFile, File, HTTPException

import os
import shutil
import time

from models.object_detector import detect_evidence_objects
from models.evidence_verifier import generate_sha256
from models.tamper_detector import perform_ela
from models.pattern_linking import find_similar_cases
from utils.metadata import extract_metadata

router = APIRouter(prefix="/investigation", tags=["Investigation"])

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)


@router.post("/investigate-evidence")
async def investigate_evidence(file: UploadFile = File(...)):
    
    start_time = time.time()
    if not file.filename.lower().endswith(
        (".jpg", ".jpeg", ".png", ".webp")
    ):
        raise HTTPException(
            status_code=400,
            detail="Unsupported file format"
        )

    input_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    annotated_path = os.path.join(
        OUTPUT_DIR,
        "annotated_" + file.filename
    )

    ela_path = os.path.join(
        OUTPUT_DIR,
        "ela_" + file.filename
    )

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    detections = detect_evidence_objects(
        input_path,
        annotated_path
    )

    detected_objects = []

    for item in detections:
        detected_objects.append(item["class"])

    metadata = extract_metadata(input_path)

    image_hash = generate_sha256(input_path)

    tamper = perform_ela(
        input_path,
        ela_path
    )

    similar_cases = find_similar_cases(
        detected_objects
    )
    tamper = {
    "tampered": bool(tamper["tampered"]),
    "confidence": float(tamper["confidence"]),
    "mean_difference": float(tamper["mean_difference"]),
    "ela_image": tamper["ela_image"]
    }
    
    processing_time = round(time.time() - start_time, 3)
    
    return {

        "status": "success",
        
        "processing_time_seconds": processing_time,

        "filename": file.filename,

        "objects": detections,

        "verification": {

            "sha256": image_hash,

            "metadata": metadata

        },

        "tamper_detection": tamper,

        "similar_cases": similar_cases,

        "annotated_image": f"/outputs/annotated_{file.filename}",

        "ela_image": f"/outputs/ela_{file.filename}"

    }
    print("detections:", type(detections))
    print("metadata:", type(metadata))
    print("image_hash:", type(image_hash))
    print("tamper:", tamper)
    print("similar_cases:", type(similar_cases))

    for key, value in tamper.items():
        print(key, type(value), value)