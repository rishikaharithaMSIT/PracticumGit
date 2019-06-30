const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Users =  require('./models/users');
var Stock = require('./models/stock');
var email 	= require("./node_modules/emailjs/email");
var nodemailer = require('nodemailer');
const http = require('http');


const app = express();

const server = http.createServer(app);
io = require('socket.io').listen(server);
const router = express.Router();
app.use(cors());
const urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(bodyParser.json());
mongoose.connect('mongodb://pharmaportal:week44project@ds231537.mlab.com:31537/pharmaportal',{ useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MangoDB Connection Established Successfully");
});

router.route('/').get(function(req, res) {
    console.log("Entered here");
    res.json("Hello");
});


//--------------------------------------REFERENCE METHOD-------------------------
// router.route('/user').get(function(req,res) {
//     Users.find({}, function(err, user) {
//         if(err) throw err;
//         res.json(user);
//     })
// });
//--------------------------------------------------------------------------------

//Socket connection



//-------------------------------------------USER DATABASE------------------------
//To add a new user to users collection
router.route('/user/add').post((req, res) => {
    Users.findOne({email : req.body.email, role : req.body.role},function(err, result){
        if(err) {
            throw err;
        }
        if(result) {
            res.send(true);
        } else {
                    let user = new Users(req.body);
                    //console.log(req.body);
                    user.save()
                        .then(user => {
                                //res.status(200).json({'user': 'Added successfully'});
                        })
                        .catch(err => {
                            //res.status(400).send('Failed to create new record');
                        });
                        res.send(false);
                }           
        
    });
    
});

//To login a user
router.route('/user/login').post((req,res) => {
    Users.findOne({email : req.body.email, password : req.body.password, role : req.body.role},function(err, result){
        if(err) {
            throw err;
        }
        //console.log(result)
        if(result) {
            res.send(true);
        } else {            
            res.send(false);               
        }
    });
});

//To get sellers
router.route('/user/getSellers').get((req,res) => {
    Users.find({} , function(err, result){
        if(err) {
            throw err;
        }
        res.json(result);
    });
});

//to get Location
router.route('/user/getLocation').post((req,res) => {
    //console.log(req.body.email + " " + req.body.role);
    Users.find({email: req.body.email, role : req.body.role} , function(err, result){
        if(err) {
            throw err;
        }
        //console.log("result "+result);
        res.json(result);
    });
});
//-------------------------------------------USER DATABASE ENDS------------------------


//-------------------------------------------STOCK DATABASE------------------------

//To add stock in stock table
router.route('/stock/addstock').post((req, res) => {
    let stock = new Stock(req.body);
    //console.log(req.body);
    stock.save()
        .then(stock => {
                //res.status(200).json({'user': 'Added successfully'});
        })
        .catch(err => {
            //res.status(400).send('Failed to create new record');
        });
        res.send(false);    
});

//to get stock from db
router.route('/stock/getallStock').post(function(req,res) {
    //console.log(req.body);
    if(req.body.role == "manufacturer"){
        Stock.find({manufacturer : req.body.email}, function(err, data) {
            if(err) throw err;
            //console.log(guessOrUser);
            res.send([data]); 
        })
    }  else if (req.body.role == "distributer") {
        Stock.find({distributer : req.body.email}, function(err, data) {
            if(err) throw err;
            //console.log(guessOrUser);
            res.send([data]); 
        })
    } else if (req.body.role == "retailer") {
        Stock.find({retailer : req.body.email}, function(err, data) {
            if(err) throw err;
            //console.log(guessOrUser);
            res.send([data]); 
        })
    }
});

//to get stock from db
router.route('/stock/getall').get(function(req,res) {
    console.log("Entered");
   
        Stock.find({}, function(err, data) {
            
            console.log("guessOrUser");
            res.send(data); 
        })
    
});

//to set sellers
router.route('/stock/setSellers').post(function(req,res) {
    //console.log("here 1 " + req.body.email);
    if(req.body.role == "manufacturer"){
        Stock.update({_id : req.body.id},{ $set : { manufacturer : req.body.email, currentLocation : req.body.currentLocation}}, function(err, data) {
            if(err) throw err;
            //console.log(guessOrUser);
            res.send(data); 
        })
    }  else if (req.body.role == "distributer") {
        //console.log("here 2");
        Stock.updateOne({_id : req.body.id},{ $set : {distributer : req.body.email, currentLocation : req.body.currentLocation}}, function(err, data) {
            if(err) throw err;
            //console.log(guessOrUser);
            res.send(data); 
        })
    } else if (req.body.role == "retailer") {
        Stock.updateOne({_id : req.body.id},{ $set : { retailer : req.body.email, currentLocation : req.body.currentLocation}}, function(err, data) {
            if(err) throw err;
            //console.log(guessOrUser);
            res.send(data); 
        })
    } else if (req.body.role == "consumer") {
        
        Stock.updateOne({_id : req.body.id},{ $set : { consumer : req.body.email}}, function(err, data) {
            if(err) throw err;
            //console.log(guessOrUser);
            res.send(data);      
            

        })
    }
});

router.route('/updateStock').post(function(req, res) {
    console.log(req.body);
})
//-------------------------------------------STOCK DATABASE ENDS------------------------

//------------------------------------------NODEMAILER--------------------------------------
router.route('/mail/sendMail').post((req, res) => {
    console.log("here");
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: req.body.from,
          pass: 'rishikarikash123'
        }
      });
      var hi = req.body.data;
      var mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: 'Invoice of Your Purchase',
        text: '',
        html : ''+hi+''
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });       
});
//------------------------------------------NODEMAILER ENDS--------------------------------------
app.use('/', router);

// app.listen(4000, function() {
//     console.log("Running on port 4000");
// });

io.on('connection', (socket) => {
    console.log('CLient connected');
    socket.on('join', function() {
        console.log("New User Joined");
    });

    socket.on('idcheck', function(tabletid) {
        console.log("Entered here with " + tabletid + " tablet id");
        Stock.find({_id : tabletid}, function(err, data) {
            console.log(data);
            io.emit('idcheckstatus', data);
        });
    });

    socket.on('report', function(reportDetails) {
        console.log(reportDetails);
        let r = reportDetails.split("-");

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rishikaharitha@gmail.com',
              pass: 'rishikarikash123'
            }
          });
          var hi = 'Drug Name : ' + r[0] +'<br>'+'Address : ' + r[1] +'<br>'+'Contact : ' + r[2] +'<br>';
          var mailOptions = {
            from: 'rishikaharitha@gmail.com',
            to: 'chaitanya.manipal@gmail.com',
            subject: 'Counterfeit Report',
            text: '',
            html : ''+hi+''
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });       

    });
})

server.listen(4000, () => {
    console.log("Node app is running on port 4000");
})