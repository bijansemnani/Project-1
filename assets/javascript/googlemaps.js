var map, infoWindow, eventinfoWindow;
var markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6,
        styles: [/* INSERT STYLE HERE... COPY/PASTE FROM https://snazzymaps.com/style/142848/red-gray-black FOR EXAMPLE  */]
    });
    //-----------------------------------------
    var contentString =
    '<div id="content">We found you!</div>';
    infowindow = new google.maps.InfoWindow({
    content: contentString
    });
    //-----------------------------------------
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var marker = new google.maps.Marker({
                position: {lat: position.coords.latitude, lng: position.coords.longitude},
                map: map,
                icon: 'https://maps.google.com/mapfiles/kml/paddle/ylw-stars-lv.png'
            });
                        //-----------------------------------------
                        marker.addListener('click', function() {
                        infowindow.open(map, marker);
                        });
                        //-----------------------------------------
            map.setCenter(pos);
        },
        function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}
//---------------------------------------------------------------------------------
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
//-----------------------------------------------------------------------------------------------------------------------------------
// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}
//-----------------------------------------------------------------------------------------------------------------------------------
// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}
//-----------------------------------------------------------------------------------------------------------------------------------
// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}
//-----------------------------------------------------------------------------------------------------------------------------------
// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}
//-----------------------------------------------------------------------------------------------------------------------------------
