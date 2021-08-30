class Api::V1::GamesController < ApplicationController
  before_action :set_game, only: [:show, :destroy]

  def index
    # games = Game.find(1)

    # render json: games

  end


  def create
  end

  def show
    if @game
      render json: @game
    else
      render json: @game.errors
    end
 
  end

  def destroy
  end

  private
  def set_game
    @game = Game.find(params[:id])
  end
end
