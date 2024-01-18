const plainText = "hello";
const encryptedText = "khoor";
const shift = 3;

const words = new Array(26).fill(1).map((_, i) => String.fromCharCode(65 + i));

const encrypt = (plainText, shift) => {
  let result = "";

  for (let i in plainText) {
    let letter = plainText[i].toUpperCase();
    enc_index = (words.indexOf(letter) + shift) % 26;
    result += words[enc_index];
  }

  return result;
};

console.log(encrypt(plainText, shift));

const decrypt = (encryptedText, shift) => {
  let result = "";

  for (let i in encryptedText) {
    let letter = encryptedText[i].toUpperCase();
    plain_index = (words.indexOf(letter) - shift) % 26;
    result += words[plain_index];
  }

  return result;
};

console.log(decrypt(encryptedText, shift));
