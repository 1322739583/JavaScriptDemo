import CryptoJS from 'crypto-js'
import {JSEncrypt} from 'jsencrypt'
import cryptoJS from './CryptoJSUtils.js'

/**
 * 创建密钥
 * @returns AES密钥
 */
export function createAesKey () {
    const expect = 16
    let str = Math.random().toString(36).substr(2)
    while (str.length < expect) {
        str += Math.random().toString(36).substr(2)
    }
    str = str.substr(0, 16)
    return str
}
/**
 * AES加密
 * @param {*} word 加密字段
 * @param {*} keyStr AES密钥
 * @returns
 */
export function AESencrypt (word, keyStr) {
    keyStr = keyStr || 'abcdefgabcdefg12'
    var key = CryptoJS.enc.Utf8.parse(keyStr) // Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var srcs = CryptoJS.enc.Utf8.parse(word)
    var encrypted = CryptoJS.DES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.ciphertext.toString()
}
/**
 * RSA加密算法
 * @param {*} pas
 * @returns
 */
export function RSAencrypt (pas, publickey) {
    let jse = new JSEncrypt()
    jse.setPublicKey(publickey)
    return jse.encrypt(pas)
}

/**
 * 获取16位随机数,当做aes秘钥key，进行加密操作
 * @constructor
 */
export function RsaEncryptData (data) {
    // 此处生成十六位随机数进行aes对称加密密钥准备
    var randomStr = Math.random().toString().substr(0, 16)
    // aes加密
    var datas = cryptoJS.encrypt(JSON.stringify(data), randomStr)
    datas = datas.toString()
    // 声明rsa加密规则
    var encrypt = new JSEncrypt()
    // 将rsa公钥进行保存
    encrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCI2zy2kkLxdhx31pu2gRB95QCx5aOvw5yTt44glEPIWhaoqXVeTch9dwAjaoInm6a1BiQHEtE/ccWTPmM7Iktrjcw3siC3dV2/QJkpk8/b52TMCw9R55qXL1+Y1f0z7BCu3ikCfyTw5cxAh5pa3r0YhYmeC+E6J3crmBPzImfYCwIDAQAB')
    // 使用公钥对aes的密钥进行加密
    var encrypted = encrypt.encrypt(randomStr)
    // 创建json对象
    let json = {
        'requestData': datas,
        'encrypted': encrypted
    }
    return json
}

/**
 * 将返回的数据进行解密操作
 * @constructor
 */
export function RsaDecryptsData (result) {
    // rsa解密,获取到aes秘钥
    var decrypt = new JSEncrypt()
    decrypt.setPrivateKey('MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBALs0Ufy3++1luZf7XtsQiPXORRuv5KC6ec7pkApNc3ckFQfpWjhAiM0yn7tqGl8y1zRRR8/g8dsUCofTLOL1EJB+7xEvUCSmjB6RDowtVOxA9vRCrrxwVoNY881x94GE/Ln2A64xVtbFspq0s9hpP4GU0QXWIHKMV/SzB7DsN37PAgMBAAECgYEArS6VukkqUlANBcCR2+7MBTmxTQ/HXbmk/fmsOxuzecBzhEIoKGnrJIl0o5hglTkfRVL8MB9VHurHYyfFGqDDlJB70FVrCPBrtxPoUtB5aI0SLSkDHX3EWjlOBlCQkMiFhx9cS9PCloDSA2Ahzga3y8Bg3LaXhoZediPgz4PmBaECQQD5+mPahaPnpJcR5CKCjryXlpqic+s0cE33ZtYPwKe163KHsSdCErOsFQ9k01JpHbCZmipzRRC+xT0CZ7DfKLRjAkEAv7bOVC+HO9YM5Qf2eYW2kUv4ssG9c8NhsXBSnKQfaFEKM4xLPtulj16YQevHpjgzr2BIg5arVWW81Nu1YLlJpQJAW7cHXcx8d2fG2ZSXKMmP3houf/4BxMqTgHrlfQAVSESrT6eqnK5Z54AOltKFwPVYrvKGMqabXzLkkHZUyXuYuwJAEkhywOCPewtcy3LI9Knl0VF3dES5tpKJfIyDtGCKhj5ERMo6WtJDpbqVtqOvtJBjjXQXNkVmLYy4R2x0jbbd6QJARGMQhsPUTkac/xf956UBZNkP8Xn/rokR3M2fm+HNPZ9t0EOzdfdIYk7aUUoLqR73v9o9YiSGy5NSwOT+33MCpw==')
    var aesKey = decrypt.decrypt(result.encrypted)
    // 用aes秘钥进行解密
    return eval('(' + cryptoJS.decrypt(result.requestData, aesKey) + ')')
}