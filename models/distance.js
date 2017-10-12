var db=require('../dbconnection'); //reference of dbconnection.js
 
var Distance={
 
getAllvesselinfo:function(callback){
 
return db.query("Select * from vessel_info limit 10",callback);
 
},
 getVesselTrack:function(mmsi, startdate, enddate, callback){
 
 	var sql = "select  lat latitude, lon longitude from vessel_track where mmsi =? and last_posdate >= ? and last_posdate <= ?";
	return db.query(sql,[mmsi, startdate, enddate],callback);
 },
 getAllVesselinfoByTimeAndMMSI:function(date,mmsi,callback){
 
 var sql = "select bb.* from (select a.mmsi,a.tipe,c.lon,c.lat,c.hdt,c.sog,c.last_posdate, a.name, a.callsign from vessel_info a inner join ( select * from ( select * from ( select mmsi,last_posdate, lat,lon,sog,hdt,cog, CASE mmsi WHEN @curType THEN @curRank := @curRank + 1 ELSE @curRank := 1 AND @curType := mmsi END AS rank from vessel_track a, (SELECT @curRank := 0, @curType := '') r where last_posdate > DATE_SUB(STR_TO_DATE(?,'%Y-%m-%d %H:%i:%s'),INTERVAL 9 HOUR) and last_posdate < DATE_SUB(STR_TO_DATE(?,'%Y-%m-%d %H:%i:%s'), INTERVAL 7 HOUR) ORDER BY MMSI, last_posdate desc ) x where x.rank = 1 ) dd ) c on c.mmsi=a.mmsi and a.mmsi = ? and a.callsign in (SELECT callsign FROM pertamina_ship)) bb LEFT JOIN vessel_type b ON (bb.tipe = b.tipe_name)order by bb.mmsi asc,bb.last_posdate asc";

return db.query(sql,[date, date, mmsi],callback);
 },
 addVesselinfo:function(Vesselinfo,callback){
 return db.query("Insert into Vesselinfo values(?,?,?)",[Vesselinfo.Id,Vesselinfo.Title,Vesselinfo.Status],callback);
 },
 deleteVesselinfo:function(id,callback){
  return db.query("delete from Vesselinfo where Id=?",[id],callback);
 },
 updateVesselinfo:function(id,Vesselinfo,callback){
  return db.query("update Vesselinfo set Title=?,Status=? where Id=?",[Vesselinfo.Title,Vesselinfo.Status,id],callback);
 }
 
};
 module.exports=Distance;