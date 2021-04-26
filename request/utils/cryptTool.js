var CryptoJS = require('../../statics/crypto/aes').CryptoJS;  //引用AES源码js

const aesKey = "CEF08F1982B141FD"
const aesIv =  "XB6D4CB8BF5E474B"

var key = CryptoJS.enc.Utf8.parse(aesKey);//十六位十六进制数作为秘钥
var iv = CryptoJS.enc.Utf8.parse(aesIv);//十六位十六进制数作为秘钥偏移量

/** AES加密方法 */

function Encrypt(word) {
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}

/** AES解密方法 */
function Decrypt(word) {
    var decrypt = CryptoJS.AES.decrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

module.exports = {
    Encrypt,
    Decrypt
}