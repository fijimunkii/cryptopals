const singleByteXorCipher = require('./3-single-byte-xor-cipher');

const fs = require('fs');
const path = require('path');
const readline = require('readline');

let detectXor = async () => {
  let rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname,'../data/1-4.txt')),
    crlfDelay: Infinity
  })

  let scores = [];

  for await (const line of rl) {
    let score = singleByteXorCipher(line);
    scores.push(score);
  }

  let sorted = scores.sort((a,b) => b.score - a.score);
  console.log(sorted.slice(0,5));
}

detectXor();
