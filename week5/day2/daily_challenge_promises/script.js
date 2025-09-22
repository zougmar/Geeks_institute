const form = document.getElementById('sunriseForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get values from inputs
    const lat1 = document.getElementById('lat1').value;
    const lng1 = document.getElementById('lng1').value;
    const lat2 = document.getElementById('lat2').value;
    const lng2 = document.getElementById('lng2').value;

    // API URL builder function
    const getSunriseURL = (lat, lng) =>
        `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`;

    try {
        // Create promises for both cities
        const promise1 = fetch(getSunriseURL(lat1, lng1)).then(res => res.json());
        const promise2 = fetch(getSunriseURL(lat2, lng2)).then(res => res.json());

        // Wait for both promises to resolve
        const [data1, data2] = await Promise.all([promise1, promise2]);

        // Display sunrise times
        resultDiv.innerHTML = `
            <p><strong>City 1 Sunrise:</strong> ${new Date(data1.results.sunrise).toLocaleTimeString()}</p>
            <p><strong>City 2 Sunrise:</strong> ${new Date(data2.results.sunrise).toLocaleTimeString()}</p>
        `;
    } catch (error) {
        console.error("Error fetching sunrise times:", error);
        resultDiv.innerHTML = `<p style="color:red;">Failed to fetch sunrise times. Please try again.</p>`;
    }
});
