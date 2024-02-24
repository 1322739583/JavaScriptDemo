//https://blog.csdn.net/wzw_wwl/article/details/129743592
import cryptoJSUtils from "./CryptoJSUtils.js";
import {RSAencrypt} from "./aesUtils.js";
//1.AES的加密解密 下面的算法是没有问题的
const key =cryptoJSUtils.createAesKey()
const encryptedText=cryptoJSUtils.encrypt("Hello AES",key)
console.log("testAES.js encryptedText:",encryptedText)

const pureText=cryptoJSUtils.decrypt(encryptedText,key)
console.log("testAES.js pureText:",pureText)

//2.RSA的加密解密
const publicKey="-----BEGIN PUBLIC KEY-----\n" +
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwXc9OOpWeNVgykGYvh7hFEZ+y\n" +
    "Y5FbqFAKtrY1gJ0ftPNSMytjvelaeNryrmh4ZZnYyUY5B19g6OteLeigs6pnHNHm\n" +
    "6FkFC0ig+dipf0H6jiM1InMY/SWnTKfdTyOJQxflpupWo/H8m73z6M1DUUybdHag\n" +
    "d8qim1fd3Ve6088YBwIDAQAB\n" +
    "-----END PUBLIC KEY-----"
const encryptedData=RSAencrypt("Hello RSA",publicKey)
console.log("testAES.js encryptedData :",encryptedData)

