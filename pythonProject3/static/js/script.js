function uploadImage() {
    const input = document.getElementById("imageInput");
    const file = input.files[0];
    const label = document.getElementById("uploadLabel");

    if (file) {
        label.textContent = "✅ " + file.name;
    } else {
        label.textContent = "Choose Image";
    }

    if (!file) {
        document.getElementById("result").textContent = "Please select an image.";
        return;
    }
    

    const formData = new FormData();
    formData.append("image", file);


    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById("preview");
        preview.src = e.target.result;
        preview.style.display = "block";
    };
    reader.readAsDataURL(file);

    document.getElementById("classResult").textContent = "";
    document.getElementById("probResult").textContent = "";
    document.getElementById("resultCard").style.display = "none";
    document.getElementById("result").textContent = "Processing... Please wait.";

    fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData
    })
    .then(async response => {
        const data = await response.json();

        if (response.ok) {
            const formattedProb = (data.probability * 100).toFixed(2);
            document.getElementById("classResult").innerHTML = `<strong>Predicted Class:</strong> <span>${data.predicted_class}</span>`;
            document.getElementById("probResult").innerHTML = `<strong>Prediction Accuracy:</strong> <span>${formattedProb}%</span>`;

            // show the card
           
            document.getElementById("resultCard").style.display = "block";
            document.getElementById("result").textContent = ""; 

        } else {
            document.getElementById("result").textContent = "Error: " + JSON.stringify(data);
        }
    })
    .catch(error => {
        document.getElementById("result").textContent = "Network Error: " + error.message;
        console.error("Fetch error:", error);
    });


}
