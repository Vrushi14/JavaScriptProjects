let classifier; // Model reference
let imgElement; // Image reference

// Load the model and set up event listeners
window.onload = function () {
  classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/[...]", modelLoaded);

  // Event listeners
  document.getElementById("fileInput").addEventListener("change", handleFileSelect);
  document.getElementById("classifyButton").addEventListener("click", classifyImage);
};

// Callback when the model is loaded
function modelLoaded() {
  console.log("Model Loaded!");
  document.getElementById("myResult").innerHTML = "Model Loaded! Select an image to classify.";
}

// Handle image selection
function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imgElement = document.getElementById("myImage");
      imgElement.src = e.target.result;
      imgElement.classList.remove("hidden");
      document.getElementById("classifyButton").classList.remove("hidden");
      document.getElementById("myResult").classList.add("hidden");
      console.log("Image loaded successfully.");
    };
    reader.readAsDataURL(file);
  } else {
    console.error("No file selected.");
  }
}

// Classify the uploaded image
function classifyImage() {
  if (imgElement) {
    document.getElementById("myResult").classList.remove("hidden");
    document.getElementById("myResult").innerHTML = "Classifying...";
    console.log("Classifying the image...");
    classifier.classify(imgElement, (error, results) => {
      if (error) {
        console.error("Classification error:", error);
        document.getElementById("myResult").innerHTML = "Error in classification. Please try again.";
      } else {
        console.log("Classification results:", results);
        const label = results[0].label;
        const confidence = (results[0].confidence * 100).toFixed(2);
        document.getElementById("myResult").innerHTML = `
          <strong>Label:</strong> ${label} <br>
          <strong>Confidence:</strong> ${confidence}%`;
      }
    });
  } else {
    alert("Please upload an image first.");
  }
}
