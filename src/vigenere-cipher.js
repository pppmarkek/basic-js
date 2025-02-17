const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    if (message === undefined || key === undefined) {
      throw new Error("Incorrect arguments!");
    }
    
    const upperMessage = message.toUpperCase();
    const upperKey = key.toUpperCase();

    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < upperMessage.length; i++) {
      const currentChar = upperMessage[i];
      if (currentChar >= "A" && currentChar <= "Z") {
        const keyChar = upperKey[keyIndex % upperKey.length];
        const shift = keyChar.charCodeAt(0) - 65;
        const encryptedCharCode =
          ((currentChar.charCodeAt(0) - 65 + shift) % 26) + 65;
        result += String.fromCharCode(encryptedCharCode);
        keyIndex++;
      } else {
        result += currentChar;
      }
    }

    if (!this.isDirect) {
      result = result.split("").reverse().join("");
    }

    return result;
  }

  decrypt(message, key) {
    if (message === undefined || key === undefined) {
      throw new Error("Incorrect arguments!");
    }

    const upperMessage = message.toUpperCase();
    const upperKey = key.toUpperCase();

    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < upperMessage.length; i++) {
      const currentChar = upperMessage[i];
      if (currentChar >= "A" && currentChar <= "Z") {
        const keyChar = upperKey[keyIndex % upperKey.length];
        const shift = keyChar.charCodeAt(0) - 65;
        const decryptedCharCode =
          ((currentChar.charCodeAt(0) - 65 - shift + 26) % 26) + 65;
        result += String.fromCharCode(decryptedCharCode);
        keyIndex++;
      } else {
        result += currentChar;
      }
    }

    if (!this.isDirect) {
      result = result.split("").reverse().join("");
    }

    return result;
  }
}

module.exports = {
  VigenereCipheringMachine,
};
