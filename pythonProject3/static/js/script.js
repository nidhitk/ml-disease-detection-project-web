function uploadImage() {
    const input = document.getElementById("imageInput");
    const file = input.files[0];

    if (!file) {
        document.getElementById("result").textContent = "Please select an image.";
        return;
    }

    const formData = new FormData();
    formData.append("image", file);

    fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData
    })
    .then(async response => {
        const data = await response.json();

        if (response.ok) {
            document.getElementById("result").textContent = "Predicted Class Index: " + data.class_index;
        } else {
            document.getElementById("result").textContent = "Error: " + JSON.stringify(data);
        }
    })
    .catch(error => {
        document.getElementById("result").textContent = "Network Error: " + error.message;
        console.error("Fetch error:", error);
    });

    // Show preview
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById("preview");
        preview.src = e.target.result;
        preview.style.display = "block";
    };
    reader.readAsDataURL(file);
}
