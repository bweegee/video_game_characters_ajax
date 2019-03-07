namespace :populate do
  desc "Populate Games"
  task games: :environment do
    20.times do
      game = Game.create(name: Faker::Zelda.game)
      5.times { Character.create(name: Faker::Zelda.character, game_id: game.id) }
    end
  end

end
