

module.exports = async function getRisks(data) {
    
    const totalIncidents = data.metadata.count;
    let incidentArray = data.DisasterDeclarationsSummaries;
  
    const fire = incidentArray.filter(function(incident){ return incident.incidentType == 'Fire';}).length;
    const flood = incidentArray.filter(function(incident){ return incident.incidentType == 'Flood';}).length;
    const drought = incidentArray.filter(function(incident){ return incident.incidentType == 'Drought';}).length;
    const hurricane = incidentArray.filter(function(incident){ return incident.incidentType == 'Hurricane';}).length;
    const tornado = incidentArray.filter(function(incident){ return incident.incidentType == 'Tornado';}).length;
    const earthquake = incidentArray.filter(function(incident){ return incident.incidentType == 'Earthquake';}).length;
    const snow = incidentArray.filter(function(incident){ return incident.incidentType == 'Snow';}).length;
  
    const payload = {
        totalIncidents,
        fire : Math.round((100 * fire) / totalIncidents),
        flood: Math.round((100 * flood) / totalIncidents),
        drought: Math.round((100 * drought) / totalIncidents),
        hurricane: Math.round((100 * hurricane) / totalIncidents),
        tornado: Math.round((100 * tornado) / totalIncidents),
        earthquake: Math.round((100 * earthquake) / totalIncidents),
        snow: Math.round((100 * snow) / totalIncidents)
    }
    return payload; 
  }
