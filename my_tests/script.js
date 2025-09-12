  function checkNumber(year) {
            year = Number(prompt("your year:"));
            return (year > 2000 ? "You are in the 21st century" : "You live in the Middle Age");
        }
        console.log(checkNumber(year));