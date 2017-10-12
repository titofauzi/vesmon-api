var db=require('../dbconnection'); //reference of dbconnection.js
 
var PortGeofence={
 
getAllPortGeofence:function(callback){
 
return db.query("Select * from vessel_info limit 10",callback);
 
},
 getAllPortGeofenceByPortCode:function(portcode,callback){
 
 var sql = "SELECT * FROM ( SELECT pertamina_port.port_lon, pertamina_port.port_lat, vessel_info.mmsi, vessel_info.imo, vessel_info.`name`, vessel_info.callsign, vessel_info.tipe, vessel_info.lon, vessel_info.lat, vessel_info.last_posdate, vessel_info.hdt, vessel_info.sog, vessel_info.cog, vessel_info.rot, vessel_info.draught, vessel_info.destination, vessel_info.cargoclass, vessel_info.size_a, vessel_info.size_b, vessel_info.size_c, vessel_info.size_d, vessel_info.fixdev, vessel_info.eta, vessel_info.class, @jarak := gcd ( pertamina_port.port_lon, pertamina_port.port_lat, vessel_info.lon, vessel_info.lat, 'nm' ) jarak FROM vessel_info, pertamina_port WHERE vessel_info.lon > pertamina_port.port_lon - 0.2 AND vessel_info.lon < pertamina_port.port_lon + 0.2 AND vessel_info.lat > pertamina_port.port_lat - 0.2 AND vessel_info.lat < pertamina_port.port_lat + 0.2 AND port_code = 'PLT' ) x WHERE @jarak < 10";

return db.query(sql,[portcode],callback);
 },
 getAllPortGeofenceByTimeAndMMSI:function(date,mmsi,callback){
 
 var sql = "select bb.* from (select a.mmsi,a.tipe,c.lon,c.lat,c.hdt,c.sog,c.last_posdate, a.name, a.callsign from vessel_info a inner join ( select * from ( select * from ( select mmsi,last_posdate, lat,lon,sog,hdt,cog, CASE mmsi WHEN @curType THEN @curRank := @curRank + 1 ELSE @curRank := 1 AND @curType := mmsi END AS rank from vessel_track a, (SELECT @curRank := 0, @curType := '') r where last_posdate > DATE_SUB(STR_TO_DATE(?,'%Y-%m-%d %H:%i:%s'),INTERVAL 9 HOUR) and last_posdate < DATE_SUB(STR_TO_DATE(?,'%Y-%m-%d %H:%i:%s'), INTERVAL 7 HOUR) ORDER BY MMSI, last_posdate desc ) x where x.rank = 1 ) dd ) c on c.mmsi=a.mmsi and a.mmsi = ? and a.callsign in (SELECT callsign FROM pertamina_ship)) bb LEFT JOIN vessel_type b ON (bb.tipe = b.tipe_name)order by bb.mmsi asc,bb.last_posdate asc";

return db.query(sql,[date, date, mmsi],callback);
 },
 addPortGeofence:function(PortGeofence,callback){
 return db.query("Insert into PortGeofence values(?,?,?)",[PortGeofence.Id,PortGeofence.Title,PortGeofence.Status],callback);
 },
 deletePortGeofence:function(id,callback){
  return db.query("delete from PortGeofence where Id=?",[id],callback);
 },
 updatePortGeofence:function(id,PortGeofence,callback){
  return db.query("update PortGeofence set Title=?,Status=? where Id=?",[PortGeofence.Title,PortGeofence.Status,id],callback);
 }
 
};
 module.exports=PortGeofence;