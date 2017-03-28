require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "requires a valid email and password" do
    user = User.new
    assert !user.valid?

    user.password = "secret1234"
    assert !user.valid?

    user.email = "joe@joesak.com"
    assert user.valid?
  end

  test "requires a unique email" do
    user = User.new(
      email: users(:joe).email,
      password: "something"
    )
    assert !user.valid?
  end
end
