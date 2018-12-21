var express = require('express');
var url = require('url');
var path = require('path');
var adminmodel = require('../models/adminmodel');
var randomstring = require("randomstring");
var router = express.Router();


var myuser;
var myuserrole;
router.use('/', function(req, res, next) {
  myuser=req.session.unm
  myuserrole=req.session.role
  if(myuser==undefined || myuserrole!='admin')
  {
   console.log('Invalid user please login first, IP tracking')
   res.redirect('/login') 
  }
  next()
});

var d;
router.use('/addsubcatadmin', function(req, res, next) {
  adminmodel.fetchallcat('addcat',function(result){
   d=result
   next()
  })
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('adminhome',{'myuser':myuser});
});

router.all('/addcatadmin', function(req, res, next) {
 if(req.method=='GET') 
  res.render('addcatadmin',{'r':''})
 else
 {
  var catid=randomstring.generate({
  length: 3,
  charset: '0123456789987654321'
 });
  var catnm=req.body.catnm	
  var catimg=req.files.catimg
	  
  var catimgnm=Date()+'-'+catimg.name
  var des=path.join(__dirname,'../public/uploads/',catimgnm)
  console.log(des)
  catimg.mv(des,function(err){
    if(err)
	console.log(err)
    else
    {
      var data={'catid':catid,'catnm':catnm,'catimgnm':catimgnm}
      adminmodel.addcatadmin(data,function(result){
           if(result)
	    res.render('addcatadmin',{'r':'Category added successfully'})
	   else
	     res.render('addcatadmin',{'r':'Category not added'})			
	})
    }
  })
 }		
});



router.all('/addsubcatadmin', function(req, res, next) {
 if(req.method=='GET') 
  res.render('addsubcatadmin',{'r':'','catdata':d})
 else
 {
  var catnm=req.body.catnm
  var subcatnm=req.body.subcatnm	
  var catimg=req.files.catimg	  
  var catimgnm=Date()+'-'+catimg.name
  var des=path.join(__dirname,'../public/uploads/',catimgnm)
  console.log(des)
  catimg.mv(des,function(err){
    if(err)
	console.log(err)
    else
    {
      adminmodel.addsubcatadmin(catnm,subcatnm,catimgnm,function(result){
           if(result)
	    res.render('addsubcatadmin',{'r':'Sub Category added successfully','catdata':d})
	   else
	     res.render('addsubcatadmin',{'r':'Sub Category not added','catdata':d})			
	})
    }
  })
 }		
});



router.get('/manageusersadmin', function(req, res, next) {
	adminmodel.manageusersadmin('register',function(result){
	 console.log(result)
	 res.render('manageusersadmin',{'data':result});	
	})  
});


router.get('/managepostadmin', function(req, res, next) {
	adminmodel.managepostadmin('addpost',function(result){
	 console.log(result)
	 res.render('managepostadmin',{'data':result});	
	})  
});


router.get('/validatepost', function(req, res, next) {
 var q=url.parse(req.url,true).query 
 if(q.block!=undefined)
 {
   adminmodel.blockpost(q.block,function(result){
	console.log('Post blocked')
	res.redirect('/admin/managepostadmin')
   })
 }
 if(q.unblock!=undefined)
 {
   adminmodel.unblockpost(q.unblock,function(result){
	console.log('Post Un-blocked')
	res.redirect('/admin/managepostadmin')
   })	
 }	
 if(q.delete!=undefined)
 {
   adminmodel.deletepost(q.delete,function(result){
	console.log('Post deleted')
	res.redirect('/admin/managepostadmin')
   })
 }	
});



router.get('/validateusers', function(req, res, next) {
 var q=url.parse(req.url,true).query 
 if(q.block!=undefined)
 {
   adminmodel.blockuser(q.block,function(result){
	console.log('User blocked')
	res.redirect('/admin/manageusersadmin')
   })
 }
 if(q.unblock!=undefined)
 {
   adminmodel.unblockuser(q.unblock,function(result){
	console.log('User Un-blocked')
	res.redirect('/admin/manageusersadmin')
   })	
 }	
 if(q.delete!=undefined)
 {
   adminmodel.deleteuser(q.delete,function(result){
	console.log('User deleted')
	res.redirect('/admin/manageusersadmin')
   })
 }	
});


module.exports = router;











