jQuery(document).ready(function($) {

	$(function() {
		$( document ).tooltip();
	});

	var $streamers = ["monstercat", 
	"twoangrygamerstv",
	"nintendouk", 
	"brotatoe", 
	"freecodecamp", 
	"letsgetlexi", 
	"futuremangaming", 
	"disney",
	"brunofin",
	"comster404",
	"jcarverpoker",
	"thorlar",
	"voreny"
	];

	var $all = $('#all-list');
	var $online = $('#online-list');
	var $offline = $('#offline-list')

	$.each($streamers, function(index, user){
		$.getJSON('https://api.twitch.tv/kraken/streams/' + user + '?callback=?', {param1: 'value1'}, function(json, textStatus) {

			// OFFLINE
			if (json.stream === null) {
				$all.append('<li class="user-item show-offline">' +
								'<h2>' +
									'<a href="http://www.twitch.tv/' + user + '/profile">' + user + '</a>' +
								'</h2>' +
							'</li>');
			//INACTIVE
			} else if (json.stream === undefined){
				$all.append('<li class="user-item show-inactive">' +
								'<h2>' + user + '</h2>' +
								'<span><em> (No account found)</em></span>' +
							'</li>');
			// ONLINE
			} else {
				var $onlineInfo = json.stream.channel.status;
				$all.append('<li class="user-item show-online">' +
								'<h2>' +
									'<a href="http://www.twitch.tv/' + user + '/"title="' + $onlineInfo + '">' + user + '</a>' +
								'</h2>' +
							'</li>');
			};
		});
	});

	// SEARCH FUNCTIONALITY
	$("#all-list").searcher({
		itemSelector: "li",
		textSelector: "",
		inputSelector: "#user-search-input",
		toggle: function(item, containsText) {
			if (containsText)
				$(item).slideDown();
			else
				$(item).slideUp();
		}
	});

	//FILTER DEPENDING ON STATUS
	$('.nav li').click(function(event) {
		var thisClass = $(this).attr('class');

		$('.nav li').removeClass('active');
		$(this).parent().addClass('active');

		if(thisClass === 'show-all'){
			$('#all-list').children('.user-item').show();
		} else {
			$('#all-list').children(':not(.' + thisClass + ')').hide();
			$('#all-list').children('.' + thisClass).show();
		}
	});
	
});

