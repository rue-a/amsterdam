

const map = L.map('map', {
    zoom: 14,
    fullscreenControl: true,
    center: [52.377956, 4.897070],
});

var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

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

});

let marker

// navigator.geolocation.getCurrentPosition(success, error, options)
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude
        marker = L.marker([lat, lon])
        marker.addTo(map);

        map.panTo([lat, lon]);
    });
}


if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude
        const marker = L.marker([lat, lon])
        // map.removeLayer(marker)
        // marker.addTo(map);

    });
}


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