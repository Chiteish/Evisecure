from fastapi import APIRouter, UploadFile, File
import shutil
import os

from models.tamper_detector import perform_ela

router = APIRouter()

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)


@router.post("/detect-tampering")
async def detect_tampering(file: UploadFile = File(...)):

    upload_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(upload_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    ela_path = os.path.join(
        OUTPUT_DIR,
        "ela_" + file.filename
    )

    result = perform_ela(upload_path, ela_path)

    return result