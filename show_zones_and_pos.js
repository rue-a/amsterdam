let marker;
let lat;
let lon;

async function get_zones() {
    // pull restricted zones from data portal amsterdam
    const query = "https://api.data.amsterdam.nl/v1/overlastgebieden/alcoholverbod/?_format=geojson"
    const response = await fetch(query);
    return response.json();
}

// initialize leaflet map
const map = L.map('map', {
    zoom: 17,
    fullscreenControl: true,
    center: [52.377956, 4.897070],
});

// add basemap to leaflet map
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 22,
    maxNativeZoom: 19
}).addTo(map);

// add restricted zones to leaflet map
get_zones().then((zones) => {
    L.geoJSON(zones, {
        style: {
            'color': 'red',
            'weight': 1.5,
        }
    }).addTo(map);
});

// pan to current location and add a marker
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        marker = L.marker([lat, lon]);
        marker.addTo(map);
        map.panTo([lat, lon]);
    });
}

// update current location marker
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function (position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude
        map.removeLayer(marker)
        marker = L.marker([lat, lon])
        marker.addTo(map);
    });
}

// pan to current location on button click
document.getElementById("button").onclick = function () {
    map.flyTo([lat, lon]);
}


