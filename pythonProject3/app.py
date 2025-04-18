import os
import torch
from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
from torchvision import models, transforms
from PIL import Image
from flask_cors import CORS

# Initialize Flask application
app = Flask(__name__)

# Enable CORS for all routes

CORS(app)

# Define allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Load model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Define model architecture (ResNet50)
model = models.resnet50(pretrained=False)

# Modify the last fully connected layer to suit your custom task (13 classes)
model.fc = torch.nn.Sequential(
    torch.nn.Dropout(p=0.4),
    torch.nn.Linear(model.fc.in_features, 13)
)

# Load the saved model weights
model_path = r"D:\ml_project\model\best_model.pth"
checkpoint = torch.load(model_path, map_location=device)

if isinstance(checkpoint, dict) and "state_dict" in checkpoint:
    model.load_state_dict(checkpoint["state_dict"])
else:
    model.load_state_dict(checkpoint)

# Move model to appropriate device
model.to(device)
model.eval()  # Set model to evaluation mode

# Define image transformations to match the model's input requirements
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),  # Standard ImageNet normalization
])

# Function to check file extension
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route to handle image upload and prediction
@app.route("/predict", methods=["POST"])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image file found in request"}), 400
    image = request.files['image']
    if image.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        filepath = os.path.join("uploads", filename)
        image.save(filepath)

        img = Image.open(filepath)
        img = transform(img).unsqueeze(0).to(device)

        with torch.no_grad():
            output = model(img)
            _, predicted_class = torch.max(output, 1)

        return jsonify({"class_index": predicted_class.item()})


if __name__ == "__main__":
    # Ensure uploads directory exists
    if not os.path.exists("uploads"):
        os.makedirs("uploads")

    app.run(debug=True)
