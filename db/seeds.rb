# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
  Character.delete_all
  Game.delete_all
  games = Game.create([{name: 'Map_1', image_url: '/waldo_1.png'}, {name: 'Map_2', image_url: '/waldo_2.png'}, {name: 'Map_3', image_url: '/waldo_3.png'}])
  characters = Character.create([{name:'wald1', coords: '2.45, 2.3, 27.8, 7.65', game_id: games[0].id, image_url: '/char1.png'}, {name:'wald2', coords: '5.8, 5.147, 2.781, 2.243', game_id: games[0].id, image_url: '/char2.png'}, {name:'wald3', coords: '2.619, 2.427, 2.330, 1.978', game_id: games[0].id, image_url: '/char3.png'} ])
