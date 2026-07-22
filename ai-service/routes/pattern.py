from fastapi import APIRouter

from models.pattern_linking import find_similar_cases

router = APIRouter()


@router.post("/pattern-linking")
async def pattern_linking():

    """
    Temporary list.
    Tomorrow it will come from YOLO automatically.
    """

    detected_objects = [

        "bus",

        "person",

        "stop sign"

    ]

    similar_cases = find_similar_cases(
        detected_objects
    )

    return {

        "status": "success",

        "detected_objects": detected_objects,

        "similar_cases": similar_cases

    }