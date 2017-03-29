class UserTokenController < Knock::AuthTokenController
  private
  def not_found
    render json: { email: ["could not be authenticated with that information"] }, status: 404
  end
end
