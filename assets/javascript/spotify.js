$(document).ready(function () {
  var queryUrl = "https://itunes.apple.com/search";
  var tasteDive = "https://tastedive.com/api/similar?k=301824-Project1-648PWR92&";

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
            console.log(response);
          }
    });
  }

  $("#add-artist").on("click", function (event) {
    event.preventDefault();
    query = $("#artist-input").val();
    $("#artist-input").val("");
    ajaxCall(query);
  });

});
