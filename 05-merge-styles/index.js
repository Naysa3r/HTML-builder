const fs = require('fs');
const path = require('path');

const filesDir = path.join(__dirname, '/styles/');
const fileCss = path.join(__dirname, '/project-dist/' ,'bundle.css');

fs.readdir(filesDir, {withFileTypes: true}, (err, files) => {
    if (err) {
        console.log(err);
    }
    else {
        let output = fs.createWriteStream(fileCss);
        for (let file of files) {
            if (path.extname(file.name) === '.css') {
                const input = fs.createReadStream(path.join(filesDir, file.name), 'utf-8');
                input.on('data', chunk => output.write(chunk));
            }
        }
    }
});
