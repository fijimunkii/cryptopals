let singleByteXorCipher = (msg) => {
  let message = Buffer.from(msg,'hex');
  let scores = [];
  for (let key=32; key<128; key++) {
    let cipher = Buffer.from(Array(message.length))
    let score = 0;
    for (let i=0;i<message.length;i++) {
      cipher[i] = message[i] ^ key
      if ((cipher[i]>=65 && cipher[i]<91) || (cipher[i]>=97 && cipher[i]<123)) {
        score++;
      }
      // possibly add additonal score for etaoin shrdlu
    }
    scores.push({key,score,cipher:cipher.toString('ascii')});
  }
  return scores.reduce((acc,d) => d.score > acc.score ? d : acc, {score:0});
}

module.exports = singleByteXorCipher;

if (!module.parent) {
  console.log(module.exports(process.argv[2]));
}
