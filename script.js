
function getflags(language) {

  var flag = '';

  if (flag.includes(language)) {

    flag = "<img class='flag' src='flags/" + language + ".png' />";
  } else {
    flag = '<span class="poster">ERROR</span>';
  }

  return flag;

}

function getRatedStars(vote) {
  var starNum = '';
  var fullStar = "<i class='fas fa-star'></i>";
  var emptyStar = "<i class='far fa-star'></i>";

  for (var i = 0; i < 5; i++) {
    if (i <= vote) {
      starNum += fullStar;
    } else {
      starNum += emptyStar;
    }
  }

  return starNum;
};

function getPoster(posterPath) {
  var posterUrl = 'https://image.tmdb.org/t/p/' + 'original' + posterPath;
  if (posterUrl != 'https://image.tmdb.org/t/p/originalnull' && posterUrl != 'https://image.tmdb.org/t/p/originalundefined') {
    return '<img class="poster" src="' + posterUrl + '">';
  }
  else {
    return '<span class="poster">NO COVER PHOTO</span>'
  }
}

$(document).ready(function () {
  $('#srcButton').one('click',function(){
    $('#search').show()
  }),
  $('#search').on('keypress',function(invio) {

    var searchValue = $('#search').val();

    if (invio.which == 13) {

    $.ajax({
      url : 'https://api.themoviedb.org/3/search/movie',
      method : 'GET',
      data : {
        api_key : '0c70749bec668f742426465c13e8120f',
        language : 'it-IT',
        query : searchValue
      },
      success : function(callData) {

        $('.results .Details').remove();
        for (var i = 0; i < callData.results.length; i++) {
          var source   = $('#movie-template').html();
          var template = Handlebars.compile(source);

          var stars = getRatedStars(callData.results[i].vote_average);

          var context = {
            titleVar : callData.results[i].title,
            originalTitleVar : callData.results[i].original_title,
            originalLangVar : getflags(callData.results[i].original_language),
            release_dateVar : callData.results[i].release_date,
            voteAverageVar : getRatedStars(callData.results[i].vote_average),
            posterVar : getPoster(callData.results[i].poster_path),
            overviewVar: callData.results[i].overview
          };

          var html = template(context);

          $(".results").append(html);

        }

      },
      error : function() {
        console.log('errore');
      }
    });
   };
 });
});
