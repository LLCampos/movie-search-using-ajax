$(function() {

var page = 1;

var addSearchResultsToPage = function(movie_list) {
    // adds 10 resuls from the movie_list to html page
    for (var i in movie_list) {

        var title = movie_list[i].Title;
        var poster_url = movie_list[i].Poster;

        $('#movies-list').append(
            "<div class='movie'>" +
            "<h1 class='title'>" + title + "</h1>" +
            "<img class='poster' src='" + poster_url + "'/>" +
             "</div>"
        );
    }
};

var ajax_search = function(movie_name, page) {
    // http://fgnass.github.io/spin.js/
    $('#spinner').spin();

    $.ajax({
        url: "http://www.omdbapi.com/?",
        data: {
            s: movie_name,
            r:  "json",
            page: page,
        },
        type: "GET",
        dataType: "json",

        success: function(searchResults) {
            movie_list = searchResults.Search;
            addSearchResultsToPage(movie_list);
        },

        error: function() {
            console.log('error');
        },

        complete: function() {
            console.log('complete');
            // turns-off spinner after completing search
            $('#spinner').spin(false);
        }
    });
};


$('#search-form').submit(function(event) {
   movie_name = $("#movie-search").val();
   ajax_search(movie_name, page);
    $('#search-form').remove();
   event.preventDefault();

});

$(window).on('scroll', function() {
    var totalHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    if (scrollPosition == totalHeight) {
        page ++;
        ajax_search(movie_name, page);
    }
});

});
