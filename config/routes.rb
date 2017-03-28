Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  resources :users
  root to: 'application#show'
end
