searchTerms = ["Christmas", "4th of July", "Halloween"];

var holiday;

var offsetNumber = 0;

var apiKey = "aK8yoLqnADi177YWasuqrRiJrvlWbJfI";

$(document).ready(function(){

    renderButtons();


    $("#searchAdd").click(function() {
        event.preventDefault();
        createButton();
        $("#searchTerm").text("");  //This should empty the textbox........
    });


    function clickingButton() {

        $("#moreGifs").remove();
        holiday = $(this).attr("id");
        console.log("holiday: " + holiday);
        addGifs();

    }

    $(document).on("click", ".search-term", clickingButton);
    $(document).on("click", ".gif", clickGif);
    $(document).on("click", "#moreGifs", addMoreGifs);


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
            holidayButton.attr({
                type: "button",
                id: searchTerms[i]
            });
            holidayButton.text(searchTerms[i]);

            console.log(holidayButton);

            $("#button-box").append(holidayButton);
        }
    }


    function moreButton() {
    
        var addMore = $("<button>");

        addMore.addClass("btn btn-outline-warning");
        addMore.attr({
            type: "button",
            id: "moreGifs"
        });
        addMore.text("More GIFs? Yes, please!");
        $("#form-box").append(addMore);
    }


    function createGifs() {

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + holiday + "&api_key=" + apiKey + "&limit=10&offset=" + offsetNumber;

        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function(response) {

            var results = response.data;
            console.log(queryURL);
            console.log(results);

            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var holidayGIF = $("<img>");

                gifDiv.addClass("gif-display");

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
    }



    function addMoreGifs() {
    
            createGifs();

            offsetNumber = offsetNumber+10;
            console.log("offsetNumber: " + offsetNumber);
            $("#moreGifs").remove();
            moreButton();
    };


    function addGifs() {

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + holiday + "&api_key=" + apiKey + "&limit=10&offset=" + offsetNumber;

        $("#gif-box").empty();

        
        $.ajax({
            url: queryURL,
            method: "GET"
        })

        createGifs();
        moreButton();
        offsetNumber = 11;

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