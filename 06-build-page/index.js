const fs = require('fs/promises');
const fstream = require('fs');
const path = require('path');



const projectDist = path.join(__dirname, '/project-dist/');
const assetsDir = path.join(__dirname, '/assets/');
const assetsCopyDir = path.join(projectDist, '/assets/');

fs.mkdir(projectDist, {recursive: true}, (err) => {
    if (err) {
        console.log(err);
    }
});

function mergeStyles() {

    const filesDir = path.join(__dirname, '/styles/');
    const fileCss = path.join(__dirname, '/project-dist/' ,'style.css');

    fstream.readdir(filesDir, {withFileTypes: true}, (err, files) => {
        if (err) {
            console.log(err);
        }
        else {
            let output = fstream.createWriteStream(fileCss);
            for (let file of files) {
                if (path.extname(file.name) === '.css') {
                    const input = fstream.createReadStream(path.join(filesDir, file.name), 'utf-8');
                    input.on('data', chunk => output.write(chunk));
                }
            }
        }
    });
}



const copyDir = (filesDir, filesCopyDir) => {
    fstream.mkdir(filesCopyDir, {recursive: true}, (err, dirpath) => {
        if (err) {
            console.log(err);
        } else {
            
            fstream.readdir(filesDir, {withFileTypes: true}, (err, files) => {
            if (err) {
                console.log(err);
            }
            else {
                for (let file of files) {
                    if (file.isDirectory()) {
                        copyDir(path.join(filesDir, file.name), path.join(filesCopyDir, file.name));
                    } else {
                        fstream.copyFile(path.join(filesDir, file.name), path.join(filesCopyDir, file.name), () => {
                        });
                    }
                }

                fstream.readdir(filesCopyDir, (err, files) => {
                    if (err) {
                        console.log(err);
                    } else {
                        files.forEach(file => {
                            fstream.readdir(filesDir, (err, files) => {

                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    if (!files.includes(file)) {
                                        fstream.unlink(path.join(filesCopyDir, file), (err) => {
                                            if (err) {
                                                console.log(err);
                                            }
                                        })
                                    }
                                }
                            })
                        })
                    }
                })
            }})
        }
    });
}

async function createHTML() {
    const template = await fs.readFile(path.join(__dirname, 'template.html'), 'utf-8');
    let result = template;
    while(result.includes('{{') && result.includes('}}')) {
        let tempvar = result.substring(result.indexOf('{{') + 2, result.indexOf('}}'));
        const componentStream = await fs.readFile(path.join(__dirname, '/components/', `${tempvar}.html`), 'utf-8');
        result = result.replace(`{{${tempvar}}}`, componentStream);
    }
    fs.writeFile(path.join(projectDist, 'index.html'), result);

    mergeStyles();
    copyDir(assetsDir, assetsCopyDir);
}

createHTML();






