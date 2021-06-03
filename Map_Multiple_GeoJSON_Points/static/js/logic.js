// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center and zoom level.
let map = L.map('mapid').setView([30, 30], 2);

// Create the tile layer that will be the background of the map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Add 'streets' title layer to the map
streets.addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/tn64/Mapping_Earthquakes/main/majorAirports.json";

// Grab our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
    //Create a geoJSON layer with the retrieved data
    L.geoJson(data, {
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h2> Airport Code: " + feature.properties.faa + "</h2> <hr> <h3>Airport Name: " + feature.properties.name + "</h3> <hr> <h4>" + feature.properties.city + ", " + feature.properties.country + "</h4>" );
        }
    }).addTo(map);
});