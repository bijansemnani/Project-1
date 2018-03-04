function searchBandsInTown(artist) {
    //console.log(similarArtists);
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    
        var results = response;
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].venue.name);
            console.log(results[i].venue.city);
            console.log(results[i].venue.region);
            console.log(results[i].venue.country);
            console.log(results[i].offers[0].url);
            console.log("/////////////////////////////");
        }

    });
}

function searchArtistInfo(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var artistName = $("<h1>").text(response.name);
        console.log(artistName);
        var artistURL = $("<a>").attr("href", response.url).append(artistName);
        console.log(artistURL);
        // var artistImage = ("<img>").attr("src", response.thumb_url);
        // console.log(artistImage);
        $("#artist-div").empty();
        $("#artist-div").append(artistURL, artistImage);
    });
}

$("#add-artist").on("click", function(event) {
    event.preventDefault();
    console.log("clicked");
    var inputArtist = $("#artist-input").val().trim();
    searchArtistInfo(inputArtist);
});

// $(document).on("ready")
// searchArtistInfo();