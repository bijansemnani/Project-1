var map, infoWindow;
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
                    //---------------------------------TESTING but it works pretty much------------------------------------------------

                    function searchBandsInTown(artist) {
                        // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
                        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
                        $.ajax({
                        url: queryURL,
                        method: "GET"
                        }).then(function(response) {
                            //---------------------------------this specific part needs work vvv------------------------------------------------
                            // Printing the entire object to console
                            console.log(response);
                            // Constructing HTML containing the artist information
                            var artistName = $("<h1>").text(artist);
                            var artistURL = $("<a>").attr("href", response.url).append(artistName);
                            var upcomingEvents = $("<h2>").text(response.length + " upcoming events");
                            var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");
                            // Empty the contents of the artist-div, append the new artist content
                            $("#artist-div").empty();
                            $("#artist-div").append(artistURL, upcomingEvents, goToArtist);
                            });
                            }
                            // Event handler for user clicking the select-artist button
                            $("#add-artist").on("click", function(event) {
                                // Preventing the button from trying to submit the form
                                event.preventDefault();
                                // Storing the artist name
                                var inputArtist = $("#artist-input").val().trim();
                                // Running the searchBandsInTown function (passing in the artist as an argument)
                                searchBandsInTown(inputArtist);
                            });
                            //---------------------------------this specific part needs work ^^^------------------------------------------------
                    //---------------------------------TESTING but it works pretty much^^^------------------------------------------------
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
