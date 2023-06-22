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

function cat(path){

  fs.readFile(path, 'utf8', function(err, data) {
  if (err) {
    // handle possible error
    console.error(err);
    // kill the process and tell the shell it errored
    process.exit(1);
  }
  // otherwise success
  console.log(`file contents: ${data}`);
  });
  
  console.log('reading file');
}

function webCat(url){
  
  axios.get(url).then(function(resp) {
  console.log(resp.data.slice(0, 80), '...');
  }).catch((e) =>{
    console.error(e);
    process.exit(1);
  });

}


if(checkURL(process.argv[2])){
  webCat(process.argv[2]);
}
else{
  cat(process.argv[2]);
}



