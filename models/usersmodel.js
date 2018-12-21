const db=require('./conn')
var randomstring = require("randomstring");

function usersmodel()
{
 this.userregister=function(cnm,data,cb){
db.collection(cnm).insert(data,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
    })
 }


this.logincheck=function(data,cb){
    
    db.collection('register').find(data).toArray(function(err,result){
	if(err)
            console.log(err)
        else
            cb(result)
    })
}

this.fetchcatlimit=function(cb)
{
    var data={}
    db.collection('addcat').find(data).toArray(function(err,result){
	if(err)
            console.log(err)
        else
            cb(result)
    }) 

 /*db.collection('addcat').find({}).toArray(function(err,result){
        if(err)
            console.log(err)
        else
            console.log(result)
})*/

 
}


}

module.exports=new usersmodel()



/*



function verifyaccount(data,cb)
{
 query="update register set vstatus='1' where email='"+data.email+"'" 	
 con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
    })	

}



function fetchsubcatlimit(d,cb)
{
 var query="select * from addsubcat where catnm='"+d.cnm+"'"
 con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
    })
 	
}

function fetchalldata(tbl_nm,cb)
{
 var query="select * from "+tbl_nm
 con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
    })
 	
}

function addpost(data,f1,f2,f3,cb)
{
 var query="insert into addpost values(NULL,'"+data.title+"','"+data.cat_nm+"','"+data.description+"','"+data.price+"','"+f1+"','"+f2+"','"+f3+"','"+data.mob+"','"+data.email+"','"+data.address+"','"+data.city+"',0,0,'"+Date()+"')"

con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
    })
}

function fetchpost(d,cb)
{
 if(d.city==undefined) 
 {
  var query="select * from addpost where catnm='"+d.scnm+"' && vstatus=1 order by pid desc"
 }
 else
 {
    var query="select * from addpost where catnm='"+d.scnm+"' && city='"+d.city+"' && vstatus=1 order by pid desc"
 }
 con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
    })
 	
}

function paymentreq(tbl_name,data,cb)
{
 var txn_id=randomstring.generate({
  length: 10,
  charset: 'abcdefghijklmnop12345qrstuvw6789xyz0'
 });
 var txn_time=Date()
 var query="insert into "+tbl_name+" values('"+txn_id+"','"+data.item_id+"','"+data.item_name+"','"+data.item_price+"','"+txn_time+"')"
 con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
    })

}

function addpostuser(data,f1,f2,f3,uid,cb)
{
 var query="insert into addpost values(NULL,'"+data.title+"','"+data.cat_nm+"','"+data.description+"','"+data.price+"','"+f1+"','"+f2+"','"+f3+"','"+data.mob+"','"+data.email+"','"+data.address+"','"+data.city+"','"+uid+"',0,'"+Date()+"')"

con.query(query,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
    })
}


module.exports={addpostuser:addpostuser,paymentreq:paymentreq,fetchpost:fetchpost,addpost:addpost,fetchalldata:fetchalldata,fetchsubcatlimit:fetchsubcatlimit,fetchcatlimit:fetchcatlimit,verifyaccount:verifyaccount,logincheck:logincheck,userregister:userregister}

*/





