document.getElementById("MyForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form refresh

    let radius = parseFloat(document.getElementById("radius").value);

    if (isNaN(radius) || radius <= 0) {
        alert("Please enter a valid positive number for radius.");
        return;
    }

    // Volume formula: (4/3) * π * r^3
    let volume = (4/3) * Math.PI * Math.pow(radius, 3);

    // Show result rounded to 2 decimals
    document.getElementById("volume").value = volume.toFixed(2);
});
