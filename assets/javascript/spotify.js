$(document).ready(function () {
  var queryUrl = "https://api.spotify.com/v1/search";
  var query = "avicii";

  $.ajax({
        url: 'https://api.spotify.com/v1/search',
        headers:{"Authorization": "Bearer BQDTmUZ1UXGIND2hVrPnc7H_9oWUGCBQbJsI1RWk9e1JP6v3JsbMh7abN1iDvacqx1O5yIyXjn-iJiWV9fKCtEe8SW8CUEoI_tpQDEkLAnkbsmhT_DiFFwymYwfk4pDDlr7jiQLaIA"},
        data: {
            q: query,
            type: 'artist'
        },
        success: function (response) {
            console.log(response);
        }
    });




});
