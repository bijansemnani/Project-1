$(document).ready(function () {
  $('.parallax').parallax();
  var similarArtists;
  var queryUrl = "https://itunes.apple.com/search";
  var tasteDive = "https://tastedive.com/api/similar?k=301824-Project1-648PWR92&";
  var youTube;
  var iframe;
  var radiusSet = false;

  function ajaxCall(query) {
    $.ajax({
          url: queryUrl,
          data: {
              media: "music",
              term: query,
              limit: 20
          },
          dataType: 'JSONP',
          success: function (response) {
              console.log(response);
              var artist = response.results[0].artistName;
              searchBandsInTown(artist);
              similiarArtists(artist);
          }
      });
  }

  //get similar artists from the user picked artist using tasteDive
  function similiarArtists(artist) {
    $.ajax({
          url: tasteDive,
          data: {
            q: artist,
            info: 1,
            limit: 10
          },
          dataType: 'JSONP',
          success: function (response) {
            //empty events div and simlar artists' buttons
            $("#upcoming-events-div").empty();
            $("#artists").empty();

            //get similarArtists from the tasteDive api
            similarArtists = response.Similar.Results;

            //for each artist get their tour dates and locations
            for (var i = 0; i < similarArtists.length; i++) {
              console.log(similarArtists[i].Name);
              searchEventsInTown(similarArtists[i].Name, true);
              searchArtistInfo(similarArtists[i].Name);
              $("#artists").append("<p class='"+i+"'>")
              $("#artists").append("<button id='"+i
              +"' class='artists'>" + similarArtists[i].Name + "</button>");
            }
          }
    });
    // Initialize carousel of dynamically created band pics (similar artists)
    $('.carousel').carousel();
  }

  //Create the radius circle based on user's inputted radius
  function setCircle(radius) {
    if(radiusSet === true){
      circle.setMap(null);
      radiusSet = false;
    }
    //Create circle around user's location
    center = new google.maps.LatLng(userLat,userLong);
    circle = new google.maps.Circle({
      map: map,
      center: center,
      radius: radius
    });
    //Get the bounds of the circle for later use
    bounds = circle.getBounds();
    radiusSet = true;
  }

  //when user searches for an artist start the search functions
  $("#add-artist").on("click", function (event) {
    event.preventDefault();

    //get the artist from the input box then empty it
    query = $("#artist-input").val();
    $("#artist-input").val("");
    var radius = Number($("#radius-input").val());
    $("#radius-input").val("");
    setCircle(radius);

    //get similar artists, search events then display events on map
    similiarArtists(query);
    search(query);
    searchEventsInTown(query, false);
  });

  //when user clicks on artist button play youtube video
  $("#artists").on("click", "button.artists", function () {
    //get the index for the similarArtist array from the id attr
    var i = $(this).attr("id");

    //create play and pause buttons
    $("p."+i).append("<button class='toggle' id='play'>Play</button>");
    $("p."+i).append("<button class='toggle' id='pause'>Pause</button>");

    //create the iframe for the youtube video
    $("#iframes").html("<iframe id='video' style=' position: absolute; \
    z-index: -1; visibility:hidden;' src='"
    +similarArtists[i].yUrl
    +"?rel=0&autoplay=1&enablejsapi=1'></iframe");

    //get the iframe info for toggling purposes
    var vid = document.getElementById("video");
    iframe = vid.contentWindow;
  });

  //play/pause button functionality for the youtube videos
  $("#artists").on("click", "button.toggle", function () {
    //get the id of the id from the play or pause buttons
    var attr = $(this).attr("id");

    //toggle the video depending on which button was pressed
    if(attr === "play"){
      iframe.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
    else{
      iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  });
});
