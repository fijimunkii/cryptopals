let message = Buffer.from(process.argv[2], 'hex');
let key = Buffer.from(process.argv[3], 'hex');
let cipher = Buffer.from(Array(key.length));
for (let i=0;i<message.length;i++) {
  cipher[i] = message[i] ^ key[i];
}
console.log(cipher);
console.log(cipher.toString('ascii'));
console.log(cipher.toString('hex'));
