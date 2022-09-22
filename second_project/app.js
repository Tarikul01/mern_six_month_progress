import http from 'http';
import {template} from './utils.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// import {data} from './data.js';
import * as fs from 'fs';

http.createServer((req,res)=>{
    if(req.url==='/'){
        res.write(template("This is home page"));
        res.end()
    }
    else if(req.url==='/about'){
        res.write(template('This is our About page.'));
        res.end();
    }else if(req.url==='/contact'){
        res.write(template("This is our Contact page."));
        res.end();
    }else{
        const readStream=fs.createReadStream(`${__dirname}/data.js`,'utf8');
        // readStream.pipe(res);
        let data="";
        readStream.on('data',(chunk)=>{
            data+=chunk;
            res.write(template(data))

        })

    }

}).listen(4040);
console.log('👍Server running : http://localhost:4040/  ');