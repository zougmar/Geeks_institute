
(function(userName) {
    const navbar = document.getElementById("navbar");
    const div = document.createElement("div");
    div.innerHTML = `
        <img src="profile.png" alt="profile" width="30">
        <span>Welcome, ${userName}</span>
    `;
    navbar.appendChild(div);
})("John");