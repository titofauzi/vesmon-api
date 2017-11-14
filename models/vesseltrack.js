var db=require('../dbconnection'); //reference of dbconnection.js
 
var Vesseltrack={
 
getAllVesselTrack:function(callback){
 
return db.query("Select * from vessel_info limit 10",callback);
 
},
 getVesselTrackByDate:function(mmsi,date,callback){
 
return db.query("select * from vessel_track where mmsi = ? and last_posdate < ? order by last_posdate desc limit 1",[mmsi, date],callback);
console.log('dasd'+date);
 }
 
};
 module.exports=Vesseltrack;