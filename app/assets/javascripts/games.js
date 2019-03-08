var currentGame = {};
var showForm = false;

$(document).ready( function() {

	$('#toggle').on('click', function() {
		showForm = !showForm;
		$('#game-form').remove()
		$('#games-list').toggle()

		if (showForm) {

			$.ajax({
				url: '/game_form',
				method: 'GET'
			}).done( function(html) {
				$('#toggle').after(html);
			});
		}
	});

	$('.game-item').on('click', function() {
		currentGame.id = this.dataset.id;
		currentGame.name = this.dataset.name;
		$.ajax({
			url: '/games/' + currentGame.id + '/characters',
			method: 'GET',
			datatype: 'JSON'
		}).done( function(characters) {
			var list = $('#characters');
			$('#game').text("Characters in " + currentGame.name);
			list.empty();
			characters.forEach( function(char) {
				var li = '<li data-character-id="' + char.id + '">' + char.name + '</li>'
				list.append(li)
			})
		})
	})
})
