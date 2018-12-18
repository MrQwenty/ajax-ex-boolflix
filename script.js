
function getRatedStars(apiScore) {
  var rated = [];
  var score = Math.round(apiScore/2);

    for (var i = 0; i < score; i++) {
      rated.push('<i class="fas fa-star"></i>')
    }
    for (var i = 0; i < (5 - score); i++) {
      rated.push('<i class="far fa-star"></i>')
    }
  return rated.join('');
}
//da rivedere flags

// function getFlag(apiLanguage) {
//  var flags = ['de','en-US','en','es','fr','it','ja','pt','ru'];
//
//   if (flags.includes(apiLanguage)) {
//    return '<img src="flags\\16\\' + apiLanguage + '.svg">';
//
//  }
//  else {
//    return apiLanguage
//  }
//
// }

function getimage(posterPath) {
  var imgUrl = 'https://image.tmdb.org/t/p/' + 'original' + posterPath;
  if (imgUrl != 'https://image.tmdb.org/t/p/originalnull') {
    return '<img src="' + imgUrl + '">';
  }
  else {
    return 'NO COVER PHOTO'
  }
}

// MILESTONE 1
$(document).ready(function () {
  $('#srcButton').click(function() {

    var searchValue = $('#search').val();

    $.ajax({
      url : 'https://api.themoviedb.org/3/search/multi',
      method : 'GET',
      data : {
        api_key : '0c70749bec668f742426465c13e8120f',
        language : 'it-IT',
        query : searchValue
      },
      success : function(callData) {

        $('.results .entry').remove();
        for (var i = 0; i < callData.results.length; i++) {
          var source   = $('#entry-template').html();
          var template = Handlebars.compile(source);

          var stars = getRatedStars(callData.results[i].vote_average);

          var context = {
            posterVar : getimage(callData.results[i].poster_path),

            titleVar : callData.results[i].title,
            originalTitleVar : callData.results[i].original_title,
            originalLangVar : callData.results[i].original_language,
            release_dateVar : callData.results[i].release_date,
            voteAverageVar : getRatedStars(callData.results[i].vote_average)
          };

          var html = template(context);

          $(".results").append(html);

        }

      },
      error : function() {
        console.log('errore');
      }
    });
  });
});
