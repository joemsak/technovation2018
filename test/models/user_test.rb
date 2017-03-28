require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "requires a valid password" do
    user = User.new
    assert !user.valid?

    user.password = "secret1234"
    assert user.valid?
  end
end
