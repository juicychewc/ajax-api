var topics = ["Sean Connery", "David Niven", "George Lazenby", "Roger Moore", "Timothy Dalton", "Pierce Brosnan", "Daniel Craig"];

//makes topic buttons
function renderButtons() {
    $("#buttonsGoHere").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("gifGenerators");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $("#buttonsGoHere").append(button);
    }
};

renderButtons();

//button adding form
$("#addButton").on("click", function (event) {
    event.preventDefault();
    var newGuy = $("#buttonInput").val();
    topics.push(newGuy);
    renderButtons();
});

//AJAX
$("#buttonsGoHere").on("click", ".gifGenerators", function (event) {
    event.preventDefault();
    var whoDis = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        whoDis + "&api_key=Wf1Ekt7WqVYzgM6Cw1sJZ23lglDyXSMe&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            // console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r") {
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var displayRating = $("<p>").text("Rating: " + rating);
                    var theImage = $("<img>");
                    var stillImage = results[i].images.fixed_height_still.url;
                    var animatedImage = results[i].images.fixed_height.url;
                    theImage.addClass("gif");
                    theImage.attr("data-still", stillImage);
                    theImage.attr("data-animate", animatedImage);
                    theImage.attr("src", stillImage);
                    theImage.attr("data-state", "still");
                    gifDiv.append(theImage);
                    gifDiv.append(displayRating);
                    $("#gififiedArea").prepend(gifDiv);
                }
            }
        });
});

//swap between still and animated states
$("#gififiedArea").on("click", ".gif", function (event) {
    event.preventDefault();
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
