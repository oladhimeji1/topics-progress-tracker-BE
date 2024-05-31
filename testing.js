const fs = require('fs');
const http = require('http');
const _ = require('lodash')

const server = http.createServer((req, res) => {
    // fs.readFile('json/test.txt', (err, data) => {
    //     if(err){
    //         console.log(err);
    //     } else{
    //         console.log(data.toString());
    //     }
    // });
    // fs.writeFile('json/test2.txt', 'Hello again', (err, data) => {
    //     console.log('Done')
    // })
    if(!fs.existsSync('./assets')){
        fs.mkdir('./assets', err => {
            if(err){
                console.log(err);
            } else {
                console.log('folder created')
            }
        });
    } else {
        console.log('folder already exist');
        fs.rmdir('./assets', err => {
            if(err){
                console.log(err);
            } else {
                console.log('Folder removed');
            }
        })
    }

    // Deleting a file
    if(fs.existsSync('.assets/deleteme.text')) {
        fs.unlink('./.assets/deleteme.text', err => {
            if(err){
                console.log(err);
            } else {
                console.log('File deleted!!');
            }
        })
    }

    // Strea and buffer
    const readStream = fs.createReadStream('./assets/doc.txt', { encoding: 'utf8'});
    const writeStream = fs.createReadStream('./assets/doc2.txt');
    readStream.on('data', chunk => {
        writeStream.write(chunk);
    })
    
});

server.listen(3000, () => console.log('Running'))