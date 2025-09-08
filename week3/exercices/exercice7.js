const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];


let firstLetters = names.map(name => name[0]);


firstLetters.sort();


let secretSocietyName = firstLetters.join('');

console.log(secretSocietyName);
