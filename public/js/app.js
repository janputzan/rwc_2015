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

		navs.find('[data-page="' + $(this).data('page') + '"]').parent().addClass('active');

		toggleRightSide('hide');

		e.preventDefault();

		switch ($(this).data('page')) {

			case 'slides':
				preloader2.show();
				showContent();
				preloader2.fadeOut(500);
				break;
			case 'pools':
				preloader2.show();
				getPools();
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

	$('.trigger-side').find('i').click(function() {

		toggleRightSide();
	});

	return false;
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

		/* register hover event handlers */

		card.hover(function() {

			$(this).find('.name-hover').show();

		},function() {

			$(this).find('.name-hover').hide();
		});

		card.click(function() {

			showInfo(that);
			toggleRightSide('show');
		});

		$('#mainContent').append(card);

	});

	return false;
}

function showContent() {

	var slides = $('<div id="slideMe" class="col s12 m12 l12 slideMe valign"></div>');

	for (var i = 1; i < 6; i++) {

		slides.append('<img src="public/img/slide' + i + '.png" class="responsive-img">');
	}
	$('#mainContent').children().remove();

	slides.slideMe().appendTo('#mainContent');

	return false;
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

	return false;
}

function getStats(id) {


	$.ajax({
		url: 'scripts/getStats.php?team_id=' + id,
		type: 'GET',
		success: function(data) {

			var resultsContainer = $('<div class="resultsContainer teams"><p>Previous Word Cup Appearances:</p></div>');

			if (data.length > 0 ) {

				$(data).each(function() {


					var results = $('<div class="results '
										+ $(this)[0].result
										+ '">'
										+ '<p><span>'
										+ $(this)[0].against
										+ '</span ><span>('
										+ $(this)[0].cup
										+ ')</span> <span>'
										+ $(this)[0].score
										+ '</span><span class="hide-me">'
										+ $(this)[0].result
										+ '</span></p>'
										+ '</div>');

					/* register hover event handlers */

					results.hover(function() {
						$(this).find('.hide-me').show();
					}, function() {
						$(this).find('.hide-me').hide();
					});

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
	});

	return false;
}

function showCups(data) {

	$('#mainContent').children().remove();

	$(data).each(function() {

		// console.log($(this)[0]);

		var card = $('<div class="cups-card">' 
				+ '<p><span>'
				+ $(this)[0].year
				+ '</span></p><p><span>Host: '
				+ $(this)[0].host_country
				+ '</span></p><p><span>Winner: '
				+ $(this)[0].winner
				+ '</span></p>'
				+ '<div class="info-hover"><p>Click for more info</p></div>'
				+ '</div>');

		var that = $(this);

		/* register hover event handlers */

		card.hover(function() {

			$(this).find('.info-hover').show();

		},function() {

			$(this).find('.info-hover').hide();
		});

		card.find('.info-hover').click(function() {

			getResults(that[0].id);
			toggleRightSide('show');
		});

		$('#mainContent').prepend(card);

	});

	return false;
}

function getResults(id) {

	$.ajax({
		url: 'scripts/getResults.php?cup_id=' + id,
		type: 'GET',
		success: function(data) {

			showResults(data);
		}
	});

	return false;
}

function showResults(data) {

	$('#sideContent').children().remove();

			// console.log($(this)[0]);

	var container = $('<div class="cup-info">'
					+ '<p><span>'
					+ data[0].year
					+ '</span></p><p><span>Host: '
					+ data[0].host_country
					+ '</span></p><p><span>Winner: '
					+ data[0].winner
					+ '</span></p><p><span>Second place: '
					+ data[0].second
					+ '</span></p><p><span>Third place: '
					+ data[0].third
					+ '</span></p></div>');

	var resultsContainer = $('<div class="resultsContainer cups"><p>All Results:</p></div>');

	if (data[1].length > 0 ) {

		$(data[1]).each(function() {


			var results = $('<div class="results">'
								+ '<p><span>'
								+ $(this)[0].h_team
								+ '</span><span>vs</span><span>'
								+ $(this)[0].a_team
								+ '</span></p>'
								+ '<p><span>'
								+ $(this)[0].score
								+ '</span></p></div>');
			
			results.appendTo(resultsContainer);
		});

	} else {

		resultsContainer.append('<p>No results yet</p>');
	}

	$('#sideContent').prepend(container);
	resultsContainer.appendTo('#sideContent');

	return false;
}

function toggleRightSide(trigger) {

	var _trigger = trigger ? trigger : null;

	var rightSide = $('.right-side');

	var center = $('.center-side');

	if (!trigger) {

		if (rightSide.css('display') == 'none') {

			rightSide.show('slide', { direction: 'right' }, 500);
			center.switchClass( 's10 m10 l10', 's7 m7 l7', 500, 'easeInOutQuad' );
		
		} else {

			center.switchClass('s7 m7 l7', 's10 m10 l10', 500, 'easeInOutQuad' );
			rightSide.hide('slide', { direction: 'right' }, 500);
		}
		
	} else if (trigger == 'show') {

		if (rightSide.css('display') == 'none') {

			rightSide.show('slide', { direction: 'right' }, 500);
			center.switchClass( 's10 m10 l10', 's7 m7 l7', 500, 'easeInOutQuad' );
		}
	
	} else if (trigger == 'hide') {

		if (rightSide.css('display') != 'none') {

			center.switchClass('s7 m7 l7', 's10 m10 l10', 500, 'easeInOutQuad' );
			rightSide.hide('slide', { direction: 'right' }, 500);
		}
	}


	return false;
}

function getPools() {

	$.ajax({
		url: 'scripts/getPools.php',
		type: 'GET',
		success: function(data) {

			showPools(data);
		}
	});

	return false;
}

function showPools(data) {

	// console.log(data);

	$('#mainContent').children().remove();

	var pool_a = $('<div class="pool-card"></div>');
	var pool_b = $('<div class="pool-card"></div>');
	var pool_c = $('<div class="pool-card"></div>');
	var pool_d = $('<div class="pool-card"></div>');

	populatePool(data.A, pool_a, 'A');
	
	pool_a.appendTo('#mainContent');

	populatePool(data.B, pool_b, 'B');
	
	pool_b.appendTo('#mainContent');

	populatePool(data.C, pool_c, 'C');
	
	pool_c.appendTo('#mainContent');

	populatePool(data.D, pool_d, 'D');
	
	pool_d.appendTo('#mainContent');


	return false;
}

function populatePool(data, element, pool) {

	element.append(getPoolTitle(pool));

	var card = $('<div class="pool-teams"></div>');

	$(data).each(function() {

		var team = $('<p><span>'
					+ $(this)[0].name
					+ '</span></p>');

		var that = $(this);

		team.click(function() {

			showInfo(that);
			toggleRightSide('show');
			
		});

		team.appendTo(card);
	});

	card.appendTo(element);

	return false;
}

function getPoolTitle(pool) {

	return $('<p><span>Pool ' + pool + '</span></p>');
}
