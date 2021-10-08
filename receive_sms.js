const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs')

let filePath = "w3otp.html";
let allmsg = "allmsg.html";

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function (req, response, next) {
    response.contentType('application/xml');
    next();
});
app.set('port', (process.env.PORT || 3000));
app.all('/receive_sms/', function (request, response) {
    let from_number = request.body.From || request.query.From;
    let to_number = request.body.To || request.query.To;
    let text = request.body.Text || request.query.Text;
    console.log('Message received - From: ' + from_number + ', To: ' + to_number + ', Text: ' + text);
   
   // code added here - VSPR
   response.sendStatus(200);
   let otp = "";
   let content = "";
   
   // always making file blank for every call , can be handled after reading the OTP as well
   content="";   
   fs.writeFile(filePath, content, err => {
        if (err) {
          console.error(err)
          return
        }
       //file written successfully
   });
   // END
    
    // always making file blank for every call , can be handled after reading the OTP as well
   content="";   
   fs.writeFile(allmsg, content, err => {
        if (err) {
          console.error(err)
          return
        }
       //file written successfully
   });
   // END

   // IF w3id OTP then 
   if ( text.indexOf("Your w3id passcode is") >= 0 ){
      otp = text.replace("Your w3id passcode is ","").replace(". It expires in 5 minutes.","")
      console.log("OTP: "+otp)
      // content="<html><title>W3OTP</title><body><div id=\"otp\">"+otp+"</div></body></html>";
      content=otp;
      fs.writeFile(filePath, content, err => {
        if (err) {
          console.error(err)
          return
        }
       //file written successfully
      });
   }
   // END
    
   // All messages
      content=text;
      fs.writeFile(allmsg, content, err => {
        if (err) {
          console.error(err)
          return
        }
       //file written successfully
      });
   // END
});
app.all('/show_otp/', function (request, response) {
    if (request.url === "/show_otp") {
        fs.readFile(filePath, function (error, pgResp) {
            if (error) {
                response.writeHead(404);
                response.write('Not Found');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(pgResp);
            }
            response.end();
        });
     }
});

app.all('/show_msg/', function (request, response) {
    if (request.url === "/show_msg") {
        fs.readFile(allmsg, function (error, pgResp) {
            if (error) {
                response.writeHead(404);
                response.write('Not Found');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(pgResp);
            }
            response.end();
        });
     }
});
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

