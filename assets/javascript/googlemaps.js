var map, infoWindow;
var markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6,
        styles: [/* INSERT STYLE HERE... COPY/PASTE FROM https://snazzymaps.com/style/142848/red-gray-black FOR EXAMPLE  */]
    });

    infoWindow = new google.maps.InfoWindow;
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
            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            // infoWindow.open(map);
            map.setCenter(pos);
        }, 
        function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
//-----------------------------------------------------------------------------------------------------------------------------------
            function searchBandsInTown(artist) {
                var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response) {
                    console.log(response);
                    var artistName = $("<h1>").text(response.name);
                    // var artistURL = $("<a>").attr("href", response.url).append(artistName);
                    var artistImage = $("<img>").attr("src", response.thumb_url);
                    var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
                    console.log(response.upcoming_event_count);
                    $("#artist-div").empty();
                    $("#artist-div").append(artistName, artistImage);
                    $("#upcoming-events-div").empty();
                    $("#upcoming-events-div").append(upcomingEvents);
                });
            }
//-----------------------------------------------------------------------------------------------------------------------------------
            function searchEventsInTown(artist) {
                var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response) {
                    console.log(response);
                    for (var i = 0; i < response.length; i++){
                            var venueLatitudeString = (response[i].venue.latitude);
                            var venueLongitudeString = (response[i].venue.longitude);
                            var datetime = (response[i].datetime);
                            var datetimeSplit = datetime.split("T");
                        //------------------------------------------------------------------------------------------------------
                        //BELOW ARE THE USEFUL VARIABLES
                        var venueName = (response[i].venue.name); //EVENT VENUE NAME
                        var venueCity = (response[i].venue.city); //EVENT CITY
                        var venueState = (response[i].venue.region); //EVENT STATE OR REGION
                        var venueCountry = (response[i].venue.country); //EVENT COUNTRY

                        var eventDate = datetimeSplit[0]; //EVENT DATE
                        var eventTime = datetimeSplit[1]; //EVENT TIME

                        var venueLatitude = Number(venueLatitudeString); //EVENT LATITUDE
                        var venueLongitude = Number(venueLongitudeString); //EVENT LONGITUDE

                        var eventTicket = (response[i].offers[0].url); //LINK TO PURCHASE TICKETS
                        var eventTicketStatus = (response[i].offers[0].status); //EVENT TICKET AVAILABILITY
                        //------------------------------------------------------------------------------------------------------
                        console.log(i + " - " + "Venue: " + venueName 
                                      + " - " + "City: "  + venueCity 
                                      + " - " + "State/Region: "  + venueState 
                                      + " - " + "Country: "  + venueCountry
                                      + " - " + "Latitude: " + venueLatitude 
                                      + " - " + "Longitude: " + venueLongitude 
                                      + " - " + "When: " + eventDate 
                                      + " - " + "Time: " + eventTime
                                      + " - " + "Tickets: " + eventTicketStatus
                                      + " - " + "Purchase tickets: " + eventTicket
                                    );
                        //------------------------------------------------------------------------------------------------------
                        // console.log(typeof venueName); RETURNS STRING
                        // console.log(typeof venueCity); RETURNS STRING
                        // console.log(typeof eventDate); RETURNS STRING
                        // console.log(typeof eventTime); RETURNS STRING
                        // console.log(typeof venueLatitude); RETURNS NUMBER
                        // console.log(typeof venueLongitude); RETURNS NUMBER
                        //------------------------------------------------------------------------------------------------------
                        //BELOW ADDS A MARKER FOR EVERY EVENT LISTED FOR THE INPUT ARTIST
                        var eventMarker = new google.maps.Marker({
                            position: {lat: venueLatitude, lng: venueLongitude},
                            map: map,
                            icon: 'https://maps.google.com/mapfiles/kml/paddle/grn-diamond-lv.png'
                        });
                        markers.push(eventMarker);
                        //------------------------------------------------------------------------------------------------------
                        var eventInfo = $("<p>").text("#" + (i + 1) + ":" 
                        + " " + "Venue: " + venueName 
                        + " - " + "City: " + venueCity 
                        + " - " + "State/Region: "  + venueState 
                        + " - " + "Country: "  + venueCountry
                        + " - " + "When: " + eventDate 
                        + " - " + "Time: " + eventTime
                        + " - " + "Tickets: " + eventTicketStatus
                        + " - " + "Purchase tickets: " + eventTicket
                        );
                        $("#upcoming-events-div").append(eventInfo);
                    }
                });
            }
//------------------------------------------------------------------------------------------------------
    $("#add-artist").on("click", function(event) {
        event.preventDefault();
        deleteMarkers();
        var inputArtist = $("#artist-input").val().trim();
        searchBandsInTown(inputArtist);
        searchEventsInTown(inputArtist);
    });
} //THIS IS WHERE initMap(); ENDS
//-----------------------------------------------------------------------------------------------------------------------------------
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