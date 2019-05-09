# 加密工具说明

```
加密算法基础包为CryptoJS v3.1.2，加入国密sm2加密算法的javascript实现；  
平安科技提供union-sm2-1.0.js及其压缩版union-sm2-mini-1.0.js两个文件；  
因项目需要md5加密算法，故在union-sm2-1.0.js基础上加入CryptoJS的md5加密算法，
微调并生成一个新的crypto.js文件； 
sm2加密算法需要公钥，根据实际情况使用开发/测试公钥或者生产公钥。
```
[CryptoJS v3.1.2地址](https://github.com/brix/crypto-js/tree/svn-mirror/3.1.2)

## 加密解密示例

```
因平安提供的加密算法为传统js文件，暂不支持node调用 

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
```
