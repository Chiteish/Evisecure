import json

DATABASE = "database/cases.json"


def jaccard_similarity(a, b):
    a = set(a)
    b = set(b)

    intersection = len(a.intersection(b))
    union = len(a.union(b))

    if union == 0:
        return 0

    return round((intersection / union) * 100, 2)


def find_similar_cases(detected_objects):

    with open(DATABASE, "r") as file:
        cases = json.load(file)

    results = []

    for case in cases:

        similarity = jaccard_similarity(
            detected_objects,
            case["objects"]
        )

        results.append({

            "case_id": case["case_id"],

            "title": case["title"],

            "similarity": similarity

        })

    results.sort(
        key=lambda x: x["similarity"],
        reverse=True
    )

    return results[:3]