var db=require('../dbconnection'); //reference of dbconnection.js
 
var Vesseltrack={
 
getAllVesselTrack:function(callback){
 
return db.query("Select * from vessel_info limit 10",callback);
 
},
 getVesselTrackByDate:function(mmsi,date,callback){
 
return db.query("select * from vessel_track where mmsi = ? and last_posdate < ? order by last_posdate desc limit 1",[mmsi, date],callback);
console.log('dasd'+date);
 },
 addVesselTrack:function(Vesselinfo,callback){
 return db.query("Insert into Vesselinfo values(?,?,?)",[Vesseltrack.Id,Vesseltrack.Title,Vesseltrack.Status],callback);
 },
 deleteVesselTrack:function(id,callback){
  return db.query("delete from Vesselinfo where Id=?",[id],callback);
 },
 updateVesselTrack:function(id,Vesselinfo,callback){
  return db.query("update Vesselinfo set Title=?,Status=? where Id=?",[Vesseltrack.Title,Vesseltrack.Status,id],callback);
 }
 
};
 module.exports=Vesseltrack;