searchTerms = ["christmas", "4th of July", "halloween"];

var holiday;

$(document).ready(function(){

    renderButtons();


    $("#searchAdd").click(function() {
        event.preventDefault();
        createButton();
        $("#searchTerm").text("");  //This should empty the textbox........
    });


    function clickingButton() {

        console.log("I clicked this button.");
        holiday = $(this).attr("id");
        console.log("holiday: " + holiday);
        addGifs();

    }

    $(document).on("click", ".search-term", clickingButton);
    $(document).on("click", ".gif", clickGif);
   


    function createButton() {

        var newHoliday = $("#searchTerm").val();
        
        searchTerms.push(newHoliday);
        console.log("searchTerms: " + searchTerms);

        $("#button-box").empty();
        renderButtons();
    }



    function renderButtons() {

        for(i = 0; i < searchTerms.length; i++) {
            var holidayButton = $("<button>");

            holidayButton.addClass("btn btn-success search-term");
            holidayButton.attr({type: "button", id: searchTerms[i]});
            holidayButton.text(searchTerms[i]);

            console.log(holidayButton);

            $("#button-box").append(holidayButton);
        }
    }


    


    function addGifs() {

        $("#gif-box").empty();

        var apiKey = "aK8yoLqnADi177YWasuqrRiJrvlWbJfI";

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + holiday + "&api_key=" + apiKey + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function(response) {

            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var holidayGIF = $("<img>");

                holidayGIF.addClass("gif");
                holidayGIF.attr("src", results[i].images.fixed_height.url);
                holidayGIF.attr("data-still", results[i].images.fixed_height_still.url);
                holidayGIF.attr("data-animate", results[i].images.fixed_height.url);
                holidayGIF.attr("data-state", "animate");

                gifDiv.append(holidayGIF);
                gifDiv.append(p);

                $("#gif-box").append(gifDiv);
            };
        });
    };

    function clickGif() {
        console.log("I clicked a GIF.")

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    };
});