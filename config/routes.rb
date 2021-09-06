Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :games, only: [:index, :show] do
        resources :players, only: [:index, :create]
      end
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index' 
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
