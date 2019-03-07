var currentGame = {};

$(document).ready( function() {
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
