const fs = require('fs');
const axios = require('axios');
const URL = require('url').URL;

function checkURL(url){
  try{
    new URL(url);
    return true;
  }
  catch(err){
    return false;
  }
}

async function cat(path, checkWrite){

  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
        // handle possible error
        console.error(err);
        // kill the process and tell the shell it errored
        process.exit(1);
    }

    checkWrite(data);

  });

}

async function webCat(url, checkWrite){

  axios.get(url).then(function(resp) {
    checkWrite(resp.data.slice(0, 80));
  }).catch((e) =>{
    console.error(e);
    process.exit(1);
  });

}


function catWrite(path, data){

    fs.writeFile(path, data, "utf8", function(err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log('Successfully wrote to file!');
      });
      
    console.log('writing file...');

}

function checkWrite(data){
    
    if(process.argv[2] == "--out"){
        catWrite(process.argv[3], data);
    }
    else{
        console.log(data);
    }
}

let readingData = process.argv[process.argv.length-1];

if(checkURL(readingData)){
    data = webCat(readingData, checkWrite);
}
else{
    data = cat(readingData, checkWrite);
}




