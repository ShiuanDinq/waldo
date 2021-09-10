class Api::V1::PlayersController < ApplicationController
  def create
    player = Player.create!(player_params)
  end

  def index
    players = Player.order("score ASC").where("game_id=?", params[:game_id]).first(10)
    render json: players
  end

  private
  def player_params
    params.require(:player).permit(:name, :score, :game_id)
  end

end