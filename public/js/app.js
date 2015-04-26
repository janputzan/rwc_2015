var preloader;
var preloader2;

$(document).ready(function() {

	preloader = $('#preloader');
	preloader2 = $('#preloader2');

	showContent();

	setPagesEvents();

	preloader.show().delay(2000).fadeOut(2000);

});

function getTeams(id) {

	var team_id = id ? '?team_id=' + id : '';

	$.ajax({
		url: 'scripts/showTeams.php' + team_id,
		type: 'GET',
		success: function(data) {
			
			// $(data).each(function() {

				showTeams(data);
			// });

		}
	})
}

function setPagesEvents() {

	var navs = $('ul');

	navs.find('a').click(function(e) {

		navs.find('li').removeClass('active');
		$(this).parent().addClass('active');

		e.preventDefault();

		switch ($(this).data('page')) {

			case 'slides':
				preloader2.show();
				showContent();
				preloader2.fadeOut(500);
				break;
			case 'pools':
				preloader2.show();
				// getCups();
				preloader2.fadeOut(500);
				break;
			case 'teams':
				preloader2.show();
				getTeams();
				preloader2.fadeOut(500);
				break;
			case 'cups':
				preloader2.show();
				getCups();
				preloader2.fadeOut(500);
				break;
			default:
				break;
		}
	});
}

function showTeams(data) {

	$('#mainContent').children().remove();

	$(data).each(function() {

		var card = $('<div class="team-card">' 
				+ '<div class="image-container"><img src="public/img/'
				+ $(this)[0].logo_url
				+ '"></div>'
				+ '<div class="name-hover">'
				+ '<p>'
				+ '<span>'
				+ $(this)[0].name
				+ '</span>'
				+ '<span>Click for more info</span></p>'
				+ '</div></div>');

		var that = $(this);

		card.hover(function() {

			$(this).find('.name-hover').show();

		},function() {

			$(this).find('.name-hover').hide();
		});

		card.click(function() {

			showInfo(that);
		});

		$('#mainContent').append(card);

	});


}

function showContent() {

	var slides = $('<div id="slideMe" class="col s12 m12 l12 slideMe"></div>');

	for (var i = 1; i < 6; i++) {

		slides.append('<img src="public/img/slide' + i + '.png" class="responsive-img">');
	}
	$('#mainContent').children().remove();

	slides.slideMe().appendTo('#mainContent');

}

function showInfo(data) {


	$('#sideContent').children().remove();

	var container = $('<div class="team-info">'
					+ '<div class="image-container"><img src="public/img/'
					+ data[0].logo_url
					+ '"></div>'
					+ '<div class="info-container">'
					+ '<p>'
					+ data[0].name
					+ '</p>'
					+ '<p>'
					+ data[0].info
					+ '</p>'
					+ '</div></div>');

	var stats = getStats(data[0].id);


	

	container.appendTo('#sideContent');
	// resultsContainer.appendTo('#sideContent');
}

function getStats(id) {


	$.ajax({
		url: 'scripts/getStats.php?team_id=' + id,
		type: 'GET',
		success: function(data) {

			var resultsContainer = $('<div class="resultsContainer"><p>Previous Word Cup Appearances:</p></div>');

			if (data.length > 0 ) {

				$(data).each(function() {


					var results = $('<div class="results">'
										+ '<p><span>'
										+ $(this)[0].against
										+ '</span><span>('
										+ $(this)[0].cup
										+ ')</span></p>'
										+ '<p class="score '
										+ $(this)[0].result
										+ '">'
										+ $(this)[0].score
										+ '</p>'
										+ '</div></div>');

					results.appendTo(resultsContainer);
					
				});

			} else {

				resultsContainer.append('<p>No previous results</p>');
			}



			resultsContainer.appendTo('#sideContent');
		}
	});

	return false;

}

function getCups() {

	$.ajax({
		url: 'scripts/getCups.php',
		type: 'GET',
		success: function(data) {

			showCups(data);
		}
	})
}

function showCups(data) {

	$('#mainContent').children().remove();

	$(data).each(function() {

		console.log($(this)[0]);

		var card = $('<div class="cups-card">' 
				+ '<p><span>Year: '
				+ $(this)[0].year
				+ '</span> <span>Winner: '
				+ $(this)[0].winner
				+ '</p><p>Host: '
				+ $(this)[0].host_country
				+ '</p><p>'
				+ '</div>');

		var that = $(this);

		// card.hover(function() {

		// 	$(this).find('.name-hover').show();

		// },function() {

		// 	$(this).find('.name-hover').hide();
		// });

		// card.click(function() {

		// 	showInfo(that);
		// });

		$('#mainContent').append(card);

	});


}