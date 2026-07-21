from PIL import Image, ImageChops, ImageEnhance
import numpy as np
import os


def perform_ela(image_path, output_path, quality=90):
    temp_file = "temp.jpg"

    image = Image.open(image_path).convert("RGB")
    image.save(temp_file, "JPEG", quality=quality)
    compressed = Image.open(temp_file)

    ela_image = ImageChops.difference(image, compressed)

    diff_np = np.array(ela_image)
    mean_diff = np.mean(diff_np)
    
    
    if os.path.exists(temp_file):
        os.remove(temp_file)
        
    enhancer = ImageEnhance.Brightness(ela_image)
    ela_visual = enhancer.enhance(12.0)
    ela_visual.save(output_path)
    
    confidence = min(round((mean_diff / 30.0) * 100, 2), 100.0)
    tampered = confidence > 15.0  # Threshold based on average pixel variance
    
    return {
        "tampered": tampered,
        "confidence": confidence,
        "mean_difference": round(float(mean_diff), 2),
        "ela_image": output_path
    }