

const map = L.map('map', {
    zoom: 17,
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
    L.geoJSON(zones, {
        style: {
            'color': 'red',
            'weight': 1.5,
        }
    }).addTo(map);

});

let marker;
let lat;
let lon;

// navigator.geolocation.getCurrentPosition(success, error, options)
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        marker = L.marker([lat, lon]);
        marker.addTo(map);

        map.panTo([lat, lon]);
    });
}


if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function (position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude
        map.removeLayer(marker)
        marker = L.marker([lat, lon])
        marker.addTo(map);

    });
}

document.getElementById("button").onclick = function () {


    map.flyTo([lat, lon]);

}


