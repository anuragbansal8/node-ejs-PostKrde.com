const db=require('./conn')
var randomstring = require("randomstring");

function adminmodel()
{

this.addcatadmin=function(data,cb)
{
 db.collection('addcat').insert(data,function(err,result){
  if(err)
   console.log(err)
  else
   cb(result)	 
 })
}

}

module.exports=new adminmodel()

/*function manageusersadmin(tbl_nm,cb)
{
 query="select * from "+tbl_nm+" where role!='admin'"
 con.query(query,function(err,result){
   if(err)
	console.log(err)
   else
	cb(result)			
 })	
}

function managepostadmin(tbl_nm,cb)
{
 query="select * from "+tbl_nm
 con.query(query,function(err,result){
   if(err)
	console.log(err)
   else
	cb(result)			
 })	
}

function blockuser(regid,cb)
{
 query="update register set vstatus='0' where regid="+regid	
 con.query(query,function(err,result){
   if(err)
	console.log(err)
   else
	cb(result)			
 })
}

function unblockuser(regid,cb)
{
 query="update register set vstatus='1' where regid="+regid	
 con.query(query,function(err,result){
   if(err)
	console.log(err)
   else
	cb(result)			
 })
}

function deleteuser(regid,cb)
{
 query="delete from register where regid="+regid	
 con.query(query,function(err,result){
   if(err)
	console.log(err)
   else
	cb(result)			
 })
}




function blockpost(pid,cb)
{
 query="update addpost set vstatus='0' where pid="+pid	
 con.query(query,function(err,result){
   if(err)
	console.log(err)
   else
	cb(result)			
 })
}

function unblockpost(pid,cb)
{
 query="update addpost set vstatus='1' where pid="+pid	
 con.query(query,function(err,result){
   if(err)
	console.log(err)
   else
	cb(result)			
 })
}

function deletepost(pid,cb)
{
 query="delete from addpost where pid="+pid	
 con.query(query,function(err,result){
   if(err)
	console.log(err)
   else
	cb(result)			
 })
}


function addcatadmin(catnm,catimgnm,cb)
{
 var query="insert into addcat values(NULL,'"+catnm+"','"+catimgnm+"')"
 con.query(query,function(err,result){
  if(err)
   console.log(err)
  else
   cb(result)	 
 })
}


function addsubcatadmin(catnm,subcatnm,subcatimgnm,cb)
{
 var query="insert into addsubcat values(NULL,'"+catnm+"','"+subcatnm+"','"+subcatimgnm+"')"
 con.query(query,function(err,result){
  if(err)
   console.log(err)
  else
   cb(result)	 
 })
}


function fetchallcat(tbl_nm,cb)
{
 var query="select * from "+tbl_nm
 con.query(query,function(err,result){
  if(err)
   console.log(err)
  else
   cb(result)	 
 })
}




module.exports={managepostadmin:managepostadmin,addsubcatadmin:addsubcatadmin,fetchallcat:fetchallcat,addcatadmin:addcatadmin,manageusersadmin:manageusersadmin,blockuser:blockuser,unblockuser:unblockuser,deleteuser:deleteuser,blockpost:blockpost,unblockpost:unblockpost,deletepost:deletepost}

*/





