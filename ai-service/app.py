from fastapi import FastAPI
from routes.evidence import router as evidence_router
from routes import tamper

app = FastAPI(
    title="Digital Evidence Locker AI Service",
    version="1.0.0"
)

app.include_router(evidence_router)
app.include_router(tamper.router)

@app.get("/")
def home():
    return {
        "message": "AI Service Running Successfully"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }