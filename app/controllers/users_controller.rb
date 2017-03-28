class UsersController < ApplicationController
  def index
    render json: [
      { name: "joe" },
      { name: "cristy" },
    ]
  end
end
