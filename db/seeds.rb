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
  characters = Character.create([
    {name:'waldo', coords: '41.1, 42.7, 16.9, 20.7', game_id: games[0].id, image_url: '/waldo.png'}, 
    {name:'wenda', coords: '29.1, 30.9, 72.4, 76.9', game_id: games[0].id, image_url: '/wenda.jpeg'}, 
    {name:'odlaw', coords: '19.0, 20.7, 71.3, 75.0', game_id: games[0].id, image_url: '/odlaw.jpeg'}, 
    {name:'white beard', coords: '67.9, 69.5, 3.1, 6.4', game_id: games[0].id, image_url: '/whitebeard.jpeg'},
    {name:'waldo', coords: '41.8, 44.1, 73.2, 80.5', game_id: games[2].id, image_url: '/waldo.png'}, 
    {name:'wenda', coords: '42.8, 44.2, 58.9, 62.1', game_id: games[2].id, image_url: '/wenda.jpeg'}, 
    {name:'white beard', coords: '64.9, 66.1, 76.8, 79.1', game_id: games[2].id, image_url: '/whitebeard.jpeg'},
    {name:'wenda', coords: '9.2, 10.7, 78.7, 81.6', game_id: games[1].id, image_url: '/wenda.jpeg'}, 
    {name:'odlaw', coords: '59.0, 59.8, 24.0, 26.0', game_id: games[1].id, image_url: '/odlaw.jpeg'}, 
    {name:'white beard', coords: '40.3, 41.4, 57.0, 59.5', game_id: games[1].id, image_url: '/whitebeard.jpeg'},
  ])
