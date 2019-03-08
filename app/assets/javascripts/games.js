var currentGame = {};
var showForm = false;
var editingGame;

$(document).ready( function() {

	$(document).on('click', '#edit-game', function() {
		toggle();
	})

	function getGame(id) {
		$.ajax({
			url: '/games' + id,
			method: 'GET'
		}).done( function(game) {
			if (editingGame) {
				var li = $("[data-id='" + id + "'")
				$(li).replaceWith(game)
				editingGame = null
			} else {
				$('#games-list').append(game)
			}
		})
	}

  $("#toggle").on("click", function() {
    toggle();
  })

  function toggle() {
    showForm = !showForm;
    $("#game-form").remove();
    $("#games-list").toggle();

    if (showForm) {
      $.ajax({
        url: "/game_form",
        method: "GET",
				data: { id: editingGame }
      }).done( function (html) {
        $("#toggle").after(html);
      })
    }
  }

	$(document).on('click', '#edit-game', function() {
		editingGame = $(this).siblings('.game-item').data().id
		toggle();
	})

  $(document).on("submit", "#game-form form", function(e) {
    e.preventDefault();
    var data = $(this).serializeArray();
		var url = '/games';
		var method = 'POST'
		if (editingGame) {
			url = url + '/' + editingGame;
			method = 'PUT'
		}

    $.ajax({
      url: "/games",
      method: "POST",
      dataType: "JSON",
      data: data
    }).done( function(game) {
      toggle();
			getGame(game.id);
    })
  })

  $(document).on('click', '.game-item', function() {
    currentGame.id = this.dataset.id;
    currentGame.name = this.dataset.name;
    $.ajax({
      url: "/games/" + currentGame.id + "/characters",
      method: "GET",
      dataType: "JSON"
    }).done( function(characters) {
      var list = $("#characters");
      $("#game").text("Characters in " + currentGame.name);
      list.empty();
      characters.forEach( function(char) {
        var li = '<li data-character-id="' + char.id + '">' + char.name + ' - ' + char.power + '</li>';
        list.append(li);
      })
    })
  })
})
