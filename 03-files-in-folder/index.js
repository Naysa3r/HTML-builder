const fs = require('fs');
const path = require('path');
const secret_path = path.join(__dirname, '/secret-folder/');

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

fs.readdir(secret_path, {withFileTypes: true}, (err, files) => {
    if (err)
      console.log(err);
    else {
    console.log("=======================");
    console.log("Filenames info:");
    console.log("=======================");
    files.forEach(file => {
        if (file.isFile()) {
            fs.stat(path.join(secret_path, file.name), (err, stats) => {
                if (err)
                    console.log(err);
                else {
                    console.log(`${path.basename(file.name).substr(0, file.name.lastIndexOf('.'))} - ${path.extname(file.name).replace('.', '')} - ${formatBytes(stats.size, 3)}`);
                }
            });
        }
    })
    }
})