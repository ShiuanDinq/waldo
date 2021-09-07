class Game < ApplicationRecord
  has_many :characters
  has_many :players, dependent: :destroy
end
