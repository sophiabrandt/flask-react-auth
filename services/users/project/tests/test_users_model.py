from project.tests.utils import add_user, recreate_db


def test_passwords_are_random(test_app):
    recreate_db()
    user_one = add_user("testuser", "test@test.com", "greaterthaneight")
    user_two = add_user("testuser2", "test@test2.com", "greaterthaneight")
    assert user_one.password != user_two.password