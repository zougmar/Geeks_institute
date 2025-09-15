function isAnagram(str1, str2) {
  // 1. Normalize: lowercase + remove spaces
  const cleanStr1 = str1.toLowerCase().replace(/\s+/g, '');
  const cleanStr2 = str2.toLowerCase().replace(/\s+/g, '');

  // 2. Sort characters
  const sortedStr1 = cleanStr1.split('').sort().join('');
  const sortedStr2 = cleanStr2.split('').sort().join('');

  // 3. Compare
  return sortedStr1 === sortedStr2;
}

// 🔹 Testing
console.log(isAnagram("Astronomer", "Moon starer"));   // true
console.log(isAnagram("School master", "The classroom")); // true
console.log(isAnagram("The Morse Code", "Here come dots")); // true
console.log(isAnagram("Hello", "World")); // false
