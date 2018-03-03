$(document).ready(function () {
  var queryUrl = "https://itunes.apple.com/search";
  var tasteDive = "https://tastedive.com/api/similar?k=301824-Project1-648PWR92&";
  var youTube;

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
            $("#testArtist").empty();
            similarArtists = response.Similar.Results;
            for (var i = 0; i < similarArtists.length; i++) {
              console.log(similarArtists[i].yUrl);
              $("#testArtist").append("<button id='" +i +
              "'class='artists'>"+ similarArtists[i].Name+ "</button> <br>");
              //searchBandsInTown(similarArtists[i].Name);
            }
          }
    });
  }

  $("#add-artist").on("click", function (event) {
    event.preventDefault();
    query = $("#artist-input").val();
    $("#artist-input").val("");
    ajaxCall(query);
  });

  $("#testArtist").on("click", "button.artists", function () {
    var i = $(this).attr("id");
    console.log(similarArtists[i].yUrl);
    $("#testArtist").append("<iframe style='visibility:hidden; display:none'src='"+similarArtists[i].yUrl+"'></iframe");
  });
});
