from fastapi import FastAPI

app = FastAPI(
    title="Digital Evidence Locker AI Service",
    version="1.0.0"
)

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