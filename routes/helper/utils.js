const internals = {};

internals.transformFEMABody = body => {
    
    //console.log(body);
    const totalIncidents = body.length;
    const fire = body.filter(function(incident){ return incident.incidentType == 'Fire';}).length;
    const flood = body.filter(function(incident){ return incident.incidentType == 'Flood';}).length;
    const drought = body.filter(function(incident){ return incident.incidentType == 'Drought';}).length;
    const hurricane = body.filter(function(incident){ return incident.incidentType == 'Hurricane';}).length;
    const tornado = body.filter(function(incident){ return incident.incidentType == 'Tornado';}).length;
    const earthquake = body.filter(function(incident){ return incident.incidentType == 'Earthquake';}).length;
    const snow = body.filter(function(incident){ return incident.incidentType == 'Snow';}).length;
    

    const transformFEMABody = {
        totalIncidents,
        fire : Math.round((100 * fire) / totalIncidents),
        flood: Math.round((100 * flood) / totalIncidents),
        drought: Math.round((100 * drought) / totalIncidents),
        hurricane: Math.round((100 * hurricane) / totalIncidents),
        tornado: Math.round((100 * tornado) / totalIncidents),
        earthquake: Math.round((100 * earthquake) / totalIncidents),
        snow: Math.round((100 * snow) / totalIncidents)
    }

    return transformFEMABody;
}

module.exports = internals;