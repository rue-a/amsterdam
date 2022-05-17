
if ("geolocation" in navigator) {
    console.log("geolocation available");
} else {
    console.log("no geoloc");
}


const map = L.map('map', {
    zoom: 14,
    fullscreenControl: true,
    center: [52.377956, 4.897070],
});

var osmLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
});
var Stamen_TonerLabels = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png',
    opacity: 0.5
});

osmLayer.addTo(map);
// Stamen_TonerLabels.addTo(map)

async function get_zones() {
    const query = "https://api.data.amsterdam.nl/v1/overlastgebieden/alcoholverbod/?_format=geojson"
    const response = await fetch(query);
    return response.json();
}



get_zones().then((zones) => {
    console.log(zones);
    L.geoJSON(zones).addTo(map);
    Stamen_TonerLabels.addTo(map, { opacity: 0.5 });

});

navigator.geolocation.watchPosition(function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude
    L.marker([lat, lon]).addTo(map);
    map.panTo([lat, lon], 14);
});


// var journeys = data.features
// L.geoJSON(journeys, {
//     style: {
//         'color': 'coral',
//         'weight': 1.5,
//         'opacity': 0.3
//     },
//     onEachFeature: function (feature, layer) {
//         layer.bindPopup(
//             '<h1>' + feature.properties.person +
//             '</h1><p>Description: ' + feature.properties.factoid +
//             '</p><p>Note: ' + feature.properties.note +
//             '</p><p>Year: ' + feature.properties.time +
//             '</p><p>Distance: ' + feature.properties.length + ' km' +
//             '</p><p>Matched Person Location: ' + feature.properties.person_matched_name +
//             '</p><p>Matched Factoid Location: ' + feature.properties.matched_name +
//             '</p>');
//     }
// }).addTo(map)


// 