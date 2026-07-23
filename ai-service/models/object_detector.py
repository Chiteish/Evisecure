import os
import cv2
from ultralytics import YOLO

# Load a lightweight pre-trained YOLOv8 model (downloads automatically on first run)
model = YOLO("yolov8n.pt")

def detect_evidence_objects(image_path: str, output_path: str):
    """
    Runs YOLOv8 object detection on an image, saves the annotated visual result,
    and returns a list of detected objects with their confidence scores.
    """
    # Run inference
    results = model(image_path)
    
    detected_items = []
    
    # Process the first result object
    for result in results:
        # Save the visual output with bounding boxes drawn automatically by YOLO
        result.save(filename=output_path)
        
        # Parse individual box coordinates and classes
        CONFIDENCE_THRESHOLD = 0.40
        for box in result.boxes:
            confidence = float(box.conf[0])
            
            if confidence < CONFIDENCE_THRESHOLD:
                continue
            class_id = int(box.cls[0])
            label = model.names[class_id]
            
            coords = [int(x) for x in box.xyxy[0].tolist()]
            
            detected_items.append({
                "class": label,
                "confidence": round(confidence, 4),
                "bbox": coords
            })
            
    return detected_items