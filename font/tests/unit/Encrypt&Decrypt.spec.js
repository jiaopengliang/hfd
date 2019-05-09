function doEncrypt(keyX, keyY, pwd) {
    var msgData = CryptoJS.enc.Utf8.parse(pwd);
    var cipherMode = SM2CipherMode.C1C3C2;
    var cipher = new SM2Cipher(cipherMode);
    var userKey = cipher.CreatePoint(keyX, keyY);
    msgData = cipher.GetWords(msgData.toString());
    return cipher.Encrypt(userKey, msgData);
}

function doDecrypt(key, str) {
    var privateKey = new BigInteger(key, 16);
    var cipherMode = SM2CipherMode.C1C3C2;
    var cipher = new SM2Cipher(cipherMode);
    return cipher.Decrypt(privateKey, str).toString();
}

// 开发时浏览器下测试
var pubX = '9D18DCF9A4C04E12FFFF68A5A43AE321D56E2E693B4DBAB6CBE263EA156B81B9';
var pubY = '68864B894038382F7649B088733CB9F4DE322953CC81C58FC76F28BC96D43AE7';
var privateKey = '11673329AAC1B97A8AB231219742BA6EC26A496F2090FD38B1F008838543F102';

var password = 'abcde12345';
var encryptData = doEncrypt(pubX, pubY, password);
var resultPassword = doDecrypt(privateKey, encryptData);
console.log('password:', password);
console.log('encryptData:', encryptData);
console.log('decrypted password:', resultPassword);