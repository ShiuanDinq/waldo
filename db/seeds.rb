# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
  Character.delete_all
  Game.delete_all
  games = Game.create([{name: 'Department store', image_url: '/waldo_1.png'}, {name: 'Forest', image_url: '/waldo_2.png'}, {name: 'Town', image_url: '/waldo_3.png'}])
  characters = Character.create([{name:'coat lady', coords: '41.3, 43.6, 4.9, 11.7', game_id: games[0].id, image_url: '/char1.png'}, {name:'iron lady', coords: '17.2, 19, 36.7, 45.1', game_id: games[0].id, image_url: '/char2.png'}, {name:'dancing man', coords: '38.5, 40.1, 43.8, 49.5', game_id: games[0].id, image_url: '/char3.png'} ])
