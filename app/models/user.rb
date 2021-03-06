class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true

  def to_token_payload
    {
      sub: {
        id: id,
        email: email,
      },
    }
  end
end
