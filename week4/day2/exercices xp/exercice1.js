const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
// 1 displays the colors
colors.forEach((color, index) => {
        console.log(`${index + 1}# choice is ${color}`);
    });

    // 2 checks if "Violet" is in the array

    colors.includes("Violet") ? console.log("Yeah") : console.log("No...");