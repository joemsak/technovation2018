class UsersController < ApplicationController
  def index
    render json: User.all
  end

  def create
    user = User.new(user_params)

    if user.save
      render json: user
    else
      render status: 403, json: user.errors
    end
  end

  private
  def user_params
    params.require(:user).permit(:password)
  end
end
