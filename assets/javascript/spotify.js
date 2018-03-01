$(document).ready(function () {
  var queryUrl = "https://api.spotify.com/v1/search";
  var query;

function ajaxCall(query) {
  $.ajax({
        url: 'https://api.spotify.com/v1/search',
        headers:{"Authorization": "Bearer BQCK6lg3oYt05LDEaCFs-9BdSmTZ5rUvvwFz7P-HoeiR5tB4BX9dHeJsm2y65ZJ-wdINN79VpdBsOkO9RDU4EEvBgslJ7GtSPfQUQYIS3-59VEwNonyQjWsH8bpvpkzlAHGhmjbbxQ"},
        data: {
            q: query,
            type: 'artist'
        },
        success: function (response) {
            var genreArray = response.artists.items[0].genres;
            console.log(genreArray);
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
