const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

const txt = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Введите текст для записи в файл. Для выхода: Ctrl+C или exit.\n');
stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
        process.exit();
    }
    txt.write(data);
});