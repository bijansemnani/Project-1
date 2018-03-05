$(document).ready(function () {
  $('.parallax').parallax();
  var queryUrl = "https://itunes.apple.com/search";
  var tasteDive = "https://tastedive.com/api/similar?k=301824-Project1-648PWR92&";
  var youTube;
  var iframe;

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
            $("#upcoming-events-div").empty();
            similarArtists = response.Similar.Results;
            for (var i = 0; i < similarArtists.length; i++) {
              console.log(similarArtists[i].Name);
              searchEventsInTown(similarArtists[i].Name, true, i);
            }
          }
    });
  }

  $("#add-artist").on("click", function (event) {
    event.preventDefault();
    query = $("#artist-input").val();
    $("#artist-input").val("");
    similiarArtists(query);
    search(query);
    searchEventsInTown(query, false);
  });

  $("#upcoming-events-div").on("click", "button.artists", function () {
    var i = $(this).attr("id");
    console.log(similarArtists[i].yUrl);
    $("p."+i).append("<button class='toggle' id='play'>Play</button>");
    $("p."+i).append("<button class='toggle' id='pause'>Pause</button>");

    $("#iframes").html("<iframe id='video' style=' position: absolute; \
    z-index: -1; visibility:hidden;' src='"
    +similarArtists[i].yUrl
    +"?rel=0&autoplay=1&enablejsapi=1'></iframe");

    var vid = document.getElementById("video");
    iframe = vid.contentWindow;
  });

  $("#upcoming-events-div").on("click", "button.toggle", function () {
    var attr = $(this).attr("id");
    
    if(attr === "play"){
      iframe.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
    else{
      iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  });
});
