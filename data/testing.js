const fs = await import('fs');
let wordsArray = [];
fs.readFile('words.txt', 'utf8', (err, data) => {
  if (err) throw err;
  wordsArray = data.split('\n')
    .map(word => word.trim().toUpperCase())  
    .filter(word => word.length > 0);
  console.log(wordsArray);
});

export default wordsArray