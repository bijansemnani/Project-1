$(document).ready(function () {
  var queryUrl = "https://api.spotify.com/v1/search";
  var postUrl = "https://accounts.spotify.com/api/token/?";
  var location = window.location.href;
  var code;
  var query;
  var access_token;
  var client_id = "1f5b4e7edfec42fca78e4fdda3824e09";
  var client_secret = "71a0b8c0a0054e53b1d2a18bba8ce8d2";
  var redirect_uri = "https://bijansemnani.github.io/Project-1/";
  var authUrl = "https://accounts.spotify.com/authorize/?";
  authUrl += "client_id=" +client_id+"&response_type=code&"+"redirect_uri="+redirect_uri;

  console.log(location.indexOf('?'));
  if(location.indexOf('?') === -1){
    $.ajax({
          url:authUrl,
          method: "GET",
          success: function (response) {
            sessionStorage.setItem("code",response.code);
          }
    });
  } else{
    postUrl+= "grant_type=authorization_code"+"&code="
    +sessionStorage.getItem("code")+"&redirect_uri="+redirect_uri+"&client_id="+client_id
    +"&client_secret="+client_secret;
    $.ajax({
          url: postUrl,
          method: "POST",
          success: function (response) {
            console.log(response);
            access_token = response.access_token;
          }
    });
  }

  function ajaxCall(query) {
    $.ajax({
          url: 'https://api.spotify.com/v1/search',
          headers:{"Authorization": "Bearer "+ access_token},
          data: {
              q: query,
              type: 'artist'
          },
          success: function (response) {
              var genreArray = response.artists.items[0].genres;
              var id = response.artists.items[0].id;
              relatedArtist(id);
              console.log(response);
          }
      });
  }

  function relatedArtist(id) {
    var queryUrl = "https://api.spotify.com/v1/artists";
    queryUrl += "/"+id+"/related-artists";
    $.ajax({
          url: queryUrl,
          headers:{"Authorization": "Bearer "+ access_token},
          data:{
            id: id
          },
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
