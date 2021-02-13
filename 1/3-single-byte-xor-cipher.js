let message = Buffer.from("1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736",'hex')
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split('').forEach(key => {
  key = Buffer.from(key,'ascii')[0]
  let cipher = Buffer.from(Array(message.length))
  for (let i=0;i<message.length;i++) {
    cipher[i] = message[i] ^ key
  }
  console.log(key, cipher.toString('ascii'))
});
