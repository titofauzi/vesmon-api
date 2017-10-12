var mysql=require('mysql');
 var connection=mysql.createPool({
 
host:'192.168.20.52',
 user:'aisuser',
 password:'aisuserpsn2012',
 database:'aissat_bkmla'
 
});
 module.exports=connection;
