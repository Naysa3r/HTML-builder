const fs = require('fs');
const path = require('path');

const files_dir = path.join(__dirname, '/files/');
const files_copy_dir = path.join(__dirname, '/files-copy/');

const copyDir = (filesDir, filesCopyDir) => {
    fs.mkdir(filesCopyDir, {recursive: true}, (err, dirpath) => {
        if (err) {
            console.log(err);
        } else {
            
            fs.readdir(filesDir, {withFileTypes: true}, (err, files) => {
            if (err) {
                console.log(err);
            }
            else {
                for (let file of files) {
                    if (file.isDirectory()) {
                        copyDir(path.join(filesDir, file.name), path.join(filesCopyDir, file.name));
                    } else {
                        fs.copyFile(path.join(filesDir, file.name), path.join(filesCopyDir, file.name), () => {
                        });
                    }
                }

                fs.readdir(filesCopyDir, (err, files) => {
                    if (err) {
                        console.log(err);
                    } else {
                        files.forEach(file => {
                            fs.readdir(filesDir, (err, files) => {

                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    if (!files.includes(file)) {
                                        fs.unlink(path.join(filesCopyDir, file), (err) => {
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

copyDir(files_dir, files_copy_dir);