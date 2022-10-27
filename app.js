const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.listen(3000, function(){
    console.log("Listening to the server 3000");
});

app.get("/", function(req, res){

    res.sendFile(__dirname+"/signup.html");

});

app.post("/", function(req, res){
    let fname = req.body.firstname;
    let lname = req.body.lastname;
    let email = req.body.email;
    // API KEY : 9e702b8dcf24379167896b0fa3254b7f-us13
    // List id : c8ebbced09

    var data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : fname,
                    LNAME : lname
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url : "https://us13.api.mailchimp.com/3.0/lists/c8ebbced09",
        method : "POST",
        headers : {
            "Authorization" : "VISHNU 9e702b8dcf24379167896b0fa3254b7f-us13" 
        },
        body : jsonData
    };

    request(options, function(err, resp, body){
        if(err){

            res.sendFile(__dirname+"/failure.html");
        
        }else{
            if(resp.statusCode==200){

                res.sendFile(__dirname+"/success.html");
                    
            }else{
                res.sendFile(__dirname+"/failure.html");

            }
        }
    });

    
});

app.post("/failure", function(req, res){
    res.redirect("/");
});


