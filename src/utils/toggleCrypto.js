import CryptoJS from 'crypto-js'
const key = CryptoJS.enc.Utf8.parse("abcdef0123456789");
export function EncryptDta(data) {
  const srcs = CryptoJS.enc.Utf8.parse(data);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode : CryptoJS.mode.ECB,
    padding : CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

export function DecryptData(data) {
  const decrypt = CryptoJS.AES.decrypt(data, key, {
    mode : CryptoJS.mode.ECB,
    padding : CryptoJS.pad.Pkcs7
  });
  return JSON.parse(CryptoJS.enc.Utf8.stringify(decrypt).toString());
}
