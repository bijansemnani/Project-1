$(document).ready(function () {
  var queryUrl = "https://api.spotify.com/v1/search";
  var query;

function ajaxCall(query) {
  $.ajax({
        url: 'https://api.spotify.com/v1/search',
        headers:{"Authorization": "Bearer BQDTmUZ1UXGIND2hVrPnc7H_9oWUGCBQbJsI1RWk9e1JP6v3JsbMh7abN1iDvacqx1O5yIyXjn-iJiWV9fKCtEe8SW8CUEoI_tpQDEkLAnkbsmhT_DiFFwymYwfk4pDDlr7jiQLaIA"},
        data: {
            q: query,
            type: 'album'
        },
        success: function (response) {
            console.log(response);
        }
    });
}
  $("add-artst").on("click", function (event) {
    event.preventDefault();
    query = $("#artist-input").val();
  });


});
