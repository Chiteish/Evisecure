import hashlib


def generate_sha256(image_path):
    """
    Generate SHA-256 hash for an image.
    """

    sha256 = hashlib.sha256()

    with open(image_path, "rb") as file:
        while True:
            chunk = file.read(4096)

            if not chunk:
                break

            sha256.update(chunk)

    return sha256.hexdigest()