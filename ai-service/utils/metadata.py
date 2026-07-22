from PIL import Image

def extract_metadata(image_path):
    """
    Extract basic metadata from an image.
    """

    image = Image.open(image_path)

    metadata = {
        "width": image.width,
        "height": image.height,
        "format": image.format,
        "mode": image.mode
    }

    return metadata