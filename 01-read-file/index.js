const { stdout } = process;

const fs = require('fs');
const path = require('path');

const txt = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(txt, 'utf-8');
let data = '';

stream.on('data', chunk => data += chunk);
stream.on('end', () => stdout.write(data));
stream.on('error', error => stdout.write('Error', error.message));