let fs = require('fs');
let path = require('path');
let file = fs.readFileSync(path.join(__dirname,'../data/1-6.txt'));
let validBase64 = file.toString().split('\n').join('');
let cipher = Buffer.from(validBase64, 'base64');

function calculateHammingDistance(a, b) {
  let acc = 0;
  for (let i = 0; i<a.length; i++) {
    let result = a[i]^b[i];
    let distance = 0;
    while (result !== 0) {
      distance++;
      result &= result - 1;
    }
    acc += distance;
  }
  return acc;
}

function findAverageDistance(keysize) {
  let chunks = Array.from(Array(4)).map((d,i) => cipher.slice(keysize*i, keysize*(i+1)))
  // optimize permutations
  let distances = [
    [0,1],[0,2],[0,3],
    [1,2],[1,3],
    [2,3]
  ].map(d => calculateHammingDistance(chunks[d[0]], chunks[d[1]]) / keysize);
  return distances.reduce((acc,d) => acc+d) / distances.length;
}

function transpose(a) {
  return Object.keys(a[0]).map(b => a.map(c => c[b]));
}

let distances = [];
// provided keysize is between 2-40
for (var keysize=2; keysize<=40; keysize++) {
  let distance = findAverageDistance(keysize);
  distances.push({ keysize, distance });
}
let smallestDistance = distances.sort((a,b) => b.distance - a.distance).pop()
let chunks = [];
for (i=0; i<cipher.length; i+=smallestDistance.keysize) {
  chunks.push(cipher.slice(i, i+smallestDistance.keysize));
}

let transposed = transpose(chunks);

let key = transposed.reduce((acc, d) => {
  let scores = [];
  for (let i=32; i<127; i++) {
    let score = 0;
    let result = Buffer.from(Array(d.length));
    for (let j=0; j<d.length; j++) {
      result[j] = d[j] ^ i;
      if ((result[j] >= 65 && result[j] < 91) || (result[j] >= 97 && result[j] < 123) || result[j] == 32) {
        score++;
      }
    }
    scores.push({char:i, score});
  }
  let highscore = scores.sort((a,b) => a.score - b.score).pop();
  return acc += String.fromCharCode(highscore.char);
}, '');

console.log({key});

key = Buffer.from(key, 'ascii');
let deciphered = Buffer.from(Array(cipher.length));
for (let i=0; i<cipher.length; i++) {
  deciphered[i] = cipher[i] ^ key[i % key.length];
}

deciphered = deciphered.toString('ascii');
console.log({deciphered})
