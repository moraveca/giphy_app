searchTerms = ["christmas", "4th of July", "halloween"];

var holiday;

$(document).ready(function(){

    renderButtons();


    $("#searchAdd").click(function() {
        event.preventDefault();
        createButton();
        $("#searchTerm").text("");  //This should empty the textbox........
    });

    $(".search-term").click(function() {

        console.log("I clicked this button.");
        holiday = $(this).attr("id");
        console.log("holiday: " + holiday);
        addGifs();

        });


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
        
                holidayGIF.attr("src", results[i].images.fixed_height.url);

                gifDiv.append(holidayGIF);
                gifDiv.append(p);

                $("#gif-box").append(gifDiv);
            };
        });
    };
});