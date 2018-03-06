var map, infoWindow;
var userLat, userLong, userPos;
var circle;
var bounds;
var markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6,
        styles: [{
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {"color": "#ffffff"}
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {"visibility": "on"},
                {"color": "#3e606f"},
                {"weight": 2},
                {"gamma": 0.84}
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {"visibility": "off"}
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {"weight": 0.6},
                {"color": "#313536"}
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {"color": "#44a688"}
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {"color": "#13876c"}
            ]
        },
        {
            "featureType": "poi.attraction",
            "elementType": "geometry.stroke",
            "stylers": [
                {"color": "#f5e4e4"},
                {"visibility": "off"}
            ]
        },
        {
            "featureType": "poi.attraction",
            "elementType": "labels",
            "stylers": [
                {"visibility": "on"},
                {"lightness": "14"}
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {"color": "#13876c"},
                {"visibility": "simplified"}
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {"color": "#067372"},
                {"lightness": "-20"}
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {"color": "#357374"}
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {"color": "#004757"}
            ]
        }]
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
            //Get user position
            userLat = position.coords.latitude;
            userLong = position.coords.longitude;

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
