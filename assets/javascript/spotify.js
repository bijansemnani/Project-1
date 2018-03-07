var count = 0;
$(document).ready(function () {
  $('.parallax').parallax();
  var similarArtists;
  var queryUrl = "https://itunes.apple.com/search";
  var tasteDive = "https://tastedive.com/api/similar?k=301824-Project1-648PWR92&";
  var youTube;
  var iframe;
  var radiusSet = false;
  var prevThis;


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
    count = 0;
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
              searchEventsInTown(similarArtists[i].Name, true);
              searchArtistInfo(similarArtists[i].Name, i);
            }
          }
    });
    // Initialize carousel of dynamically created band pics (similar artists)
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
    $("#similarArtistEvents").empty();
    count = 0;
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

  //when user clicks on play button play youtube video
  $(document).on("click", "button.toggle-play", function () {
    var i = $(this).attr("id");
    console.log(i);
    console.log(prevThis);
    console.log(prevThis !== i);
    if(prevThis !== i){
      $(this).attr("data-toggle", "off");
    }
    var attr = $(this).attr("class");
    var toggle = $(this).attr("data-toggle");
    //if the youtube video
    if(toggle === "off"){
      $("#iframes").html("<iframe id='video' style=' position: absolute; \
      z-index: -1; visibility:hidden;' src='"
      +similarArtists[i].yUrl
      +"?rel=0&autoplay=1&enablejsapi=1'></iframe");
      $(this).attr("data-toggle","on");
      prevThis = i;
    } else{
      iframe.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
    var vid = document.getElementById("video");
    iframe = vid.contentWindow;
  });

  $(document).on("click", "button.toggle-pause", function () {
    iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  });

});
