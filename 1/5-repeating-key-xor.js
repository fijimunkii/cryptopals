let key = Buffer.from("ICE", 'ascii');
let message = Buffer.from("Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal", 'ascii');
let cipher = Buffer.from(Array(message.length));
let keyIndex = 0;
for (let i=0;i<message.length;i++) {
  cipher[i] = message[i] ^ key[keyIndex];
  keyIndex++;
  if (keyIndex > key.length) {
    keyIndex = 0;
  }
}

console.log(cipher.toString('hex'));
