# Image Classifier with Flask and PyTorch

This project is an image classification web application built using Flask and PyTorch. It utilizes a custom-trained ResNet50 model for predicting the class of uploaded images. The web interface allows users to upload an image and receive the predicted class index from the model.

## Features

- Upload an image and get the predicted class index.
- Built with Flask as the backend and PyTorch for the model inference.
- Simple and intuitive web interface for easy usage.
- Model is based on ResNet50 with custom modifications for 13 classes.

## Requirements

- Python 3.x
- Flask
- PyTorch
- torchvision
- Pillow
- werkzeug

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```
###2. Set up a virtual environment
Create and activate a virtual environment to manage dependencies:
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

###3. Install required dependencies
Install the required Python packages using pip:
```bash
pip install -r requirements.txt
```

Alternatively, you can manually install the required packages:

```bash
pip install flask torch torchvision pillow werkzeug
```
###4. Download the pre-trained model
Ensure that the trained model (best_model.pth) is located in the model/ directory in your project. If you don't have the model, you can train it or download it from the appropriate source.

###5. Run the Flask server
To run the Flask application, execute the following command:
```bash
python app.py
```
This will start the Flask server locally at http://127.0.0.1:5000/.

###6. Access the Web Interface
Open your web browser and navigate to:
```bash
http://127.0.0.1:5000/
```
You should be able to upload an image and get the predicted class index.

##How it works

###1.Backend (Flask + PyTorch):

  - The Flask app listens for POST requests at /predict containing an image.

  - The image is processed, resized, and transformed to match the model's input size.

  - The pre-trained ResNet50 model predicts the class, and the result is sent back to the frontend as a JSON response.

###2.Frontend (HTML + JavaScript):

 - A simple HTML form allows users to upload images.

 - JavaScript handles the image upload, sends it to the backend via a POST request, and displays the predicted class index.

Folder Structure
```bash
/your-repository-name
│
├── app.py              # Flask application for model inference
├── model/              # Folder containing the trained model (best_model.pth)
├── uploads/            # Folder for storing uploaded images
├── templates/          # HTML templates
│   └── index.html      # Main HTML file for the front-end
├── static/             # Static files like CSS, JS, images
│   ├── script.js       # JavaScript file for handling image upload and API call
│   └── style.css       # CSS file for styling the web page
├── requirements.txt    # List of Python dependencies
└── README.md           # Project README file
```
###License
This project is open source and available under the MIT License.

###Contributing
Feel free to fork the repository, create a new branch, make changes, and submit a pull request. Any contributions are welcome!

###Acknowledgements
- PyTorch for deep learning and model inference.

- Flask for creating the web application.

- ResNet50 model pre-trained on ImageNet.

