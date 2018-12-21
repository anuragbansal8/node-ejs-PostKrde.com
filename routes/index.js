var express = require('express');
var usersmodel=require('../models/usersmodel');
var testmail=require('./testmail');
var url=require('url');
var path=require('path');
var randomstring = require("randomstring");

var router = express.Router();

/* GET home page. */

var d1=''
router.use('/viewsubcat', function(req, res, next) {
  usersmodel.fetchalldata('addcat',function(result){
    d1=result
    next()	 
  })
});

var d2=''
router.use('/addpost', function(req, res, next) {
  usersmodel.fetchalldata('addsubcat',function(result){
    d2=result
    next()	 
  })
});


router.get('/', function(req, res, next) {
  usersmodel.fetchcatlimit(function(result){
    res.render('index', {'data':result});	
  })
});

router.get('/home', function(req, res, next) {
  usersmodel.fetchcatlimit(function(result){
    res.render('index', {'data':result});	
  })
});



router.get('/viewpost', function(req, res, next) {
  var d=url.parse(req.url,true).query
  usersmodel.fetchpost(d,function(result){
    res.render('viewpost', {'data':result,'scatnm':d});	
  })	  
});

router.get('/viewsubcat', function(req, res, next) {
  var d=url.parse(req.url,true).query
  usersmodel.fetchsubcatlimit(d,function(result){
    res.render('viewsubcat', {'data':result,'catnm':d,'catlist':d1});	
  })	  
});


router.all('/addpost', function(req, res, next) {
 if(req.method=='GET') 
  res.render('addpost',{'result':'','subcatlist':d2});
 else
 {
  var data=req.body
  
  imgref1=req.files.myimg1
  if(imgref1!=undefined)
  {
    var f1=Date()+'-'+imgref1.name	
    var des=path.join(__dirname,'../public/uploads',f1)
    imgref1.mv(des)
  }
  else
    var f1='dummy.png'

  imgref2=req.files.myimg2
  if(imgref2!=undefined)
  {
    var f2=Date()+'-'+imgref2.name	
    var des=path.join(__dirname,'../public/uploads',f2)
    imgref2.mv(des)
  }
  else
    var f2='dummy.png'


  imgref3=req.files.myimg3
  if(imgref3!=undefined)
  {
    var f3=Date()+'-'+imgref3.name	
    var des=path.join(__dirname,'../public/uploads',f3)
    imgref3.mv(des)
  }
  else
    var f3='dummy.png'	 
  	
  usersmodel.addpost(data,f1,f2,f3,function(result){
    if(result)
	  res.render('addpost',{'result':'Post added, wait for verification...','subcatlist':d2})
    else
	  res.render('addpost',{'result':'Post not added','subcatlist':d2}) 		
  })

 }
});

router.get('/about', function(req, res, next) {
  
  res.cookie('unm','abc')
  res.cookie('pass','123')
  res.clearCookie('unm')		 
  res.render('about', {'mycookie':req.cookies});
});


router.get('/service', function(req, res, next) {


  
var paypalURL = "https://www.sandbox.paypal.com/cgi-bin/webscr"; 
var paypalID = "jithackathonmyseller@gmail.com"; 

var item_name='Bike'
var item_price='100'
var item_id='1001001'

res.render('service', {'item_name':item_name,'item_id':item_id,'item_price':item_price,'paypalURL':paypalURL,'paypalID':paypalID});
});


router.get('/cancel', function(req, res, next) {
  res.render('cancel');
});

router.get('/success', function(req, res, next) {
 var q=url.parse(req.url,true).query    
 usersmodel.paymentreq('payment',q,function(result){
  res.render('success');
 }) 
});






router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});


router.all('/register', function(req, res, next) {//manage all methods
  var regid=randomstring.generate({
  length: 10,
  charset: '0123456789987654321'
 });
  req.body.regid=regid
  if(req.method=="GET")
    res.render('register',{'result':''});
  else
      //receiving the post data with middle ware
      usersmodel.userregister('register',req.body,function(result){
          if(result)
	  {
              testmail.mymail(req.body.email,req.body.pass,function(result1){
	res.render('register',{'result':'Registered successfully, verify your account from Inbox'})
		})	
        
	  }	          
	else
              res.render('register',{'result':'Registered failed, try again'})
      });
});



router.all('/login', function(req, res, next) {
if(req.cookies.unm!=undefined)
{
 d={'u':req.cookies.unm,'p':req.cookies.pass,'s':1}
}
else
{
 d={'u':'','p':'','s':0}
}

  if(req.method=="GET")
      res.render('login',{'result':'','d':d});
  else
  {
  var data={'email':req.body.email,'pass':req.body.pass,'vstatus':1}
  usersmodel.logincheck(data,function(result){
              if(result.length>0)
              {

if(req.body.chk!=undefined)
{
 res.cookie('unm',req.body.email,{'expire':3600})
 res.cookie('pass',req.body.pass,{'expire':3600})
}
                req.session.unm=req.body.email 
req.session.role=result[0].role
 
                if(result[0].role=='admin')
		 res.redirect('/admin')
		if(result[0].role=='user')
		 res.redirect('/users')
	      }	    
              else
                  res.render('login',{'result':'Invalid username or password','d':d});
                      
              });
            }              
});

router.get('/logout', function(req, res, next) {
  req.session.destroy()
  res.redirect('/login')
});

router.get('/verify', function(req, res, next) {
  var data=url.parse(req.url,true).query	
  usersmodel.verifyaccount(data,function(result){
    res.redirect('/login');	
  })
});



module.exports = router;
