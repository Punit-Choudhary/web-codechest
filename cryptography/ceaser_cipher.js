const plainText = "hello";
const encryptedText = "khoor";
const shift = 3;

const words = new Array(26).fill(1).map((_, i) => String.fromCharCode(65 + i));

const encrypt = (plainText, shift) => {
  let result = "";

  for (let i in plainText) {
    let letter = plainText[i].toUpperCase();
    let enc_index = (words.indexOf(letter) + shift) % 26;
    result += words[enc_index];
  }

  return result;
};

console.log(encrypt(plainText, shift));

const decrypt = (encryptedText, shift = null) => {
  if (shift) {
    let result = "";

    for (let i in encryptedText) {
      let letter = encryptedText[i].toUpperCase();
      let plainIndex = (words.indexOf(letter) - (shift % 26) + 26) % 26;
      result += words[plainIndex];
    }

    return result;
  } else {
    // Bruteforce decrypting
    let result = [];

    for (let s = 0; s <= 26; s++) {
      let decryptedText = "";
      for (let i in encryptedText) {
        let letter = encryptedText[i].toUpperCase();
        let plainIndex = (words.indexOf(letter) - s + 26) % 26;
        decryptedText += words[plainIndex];
      }

      result.push(decryptedText);
    }

    return result;
  }
};

console.log(decrypt(encryptedText));
