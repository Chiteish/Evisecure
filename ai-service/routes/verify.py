from fastapi import APIRouter, UploadFile, File
import shutil
import os

from utils.metadata import extract_metadata
from models.evidence_verifier import generate_sha256

router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/verify-evidence")
async def verify_evidence(file: UploadFile = File(...)):

    image_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    metadata = extract_metadata(image_path)

    image_hash = generate_sha256(image_path)

    return {
        "status": "success",
        "filename": file.filename,
        "sha256": image_hash,
        "metadata": metadata,
        "verification": {
            "tampered": False,
            "reason": "Original evidence stored. No previous hash available."
        }
    }