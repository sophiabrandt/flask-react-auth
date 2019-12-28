import json

from project.tests.utils import add_user


def test_user_registration(test_app, test_database):
    client = test_app.test_client()
    resp = client.post(
        "/auth/register",
        data=json.dumps(
            {"username": "justatest", "email": "test@test.com", "password": "12345678"}
        ),
        content_type="application/json",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 201
    assert "Successfully registered." in data["message"]
    assert "success" in data["status"]
    assert data["auth_token"]
    assert resp.content_type == "application/json"


def test_user_registration_duplicate_email(test_app):
    add_user("test", "test@test.com", "test")
    client = test_app.test_client()
    resp = client.post(
        "/auth/register",
        data=json.dumps(
            {"username": "michael", "email": "test@test.com", "password": "test"}
        ),
        content_type="application/json",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 400
    assert "Sorry. That user already exists." in data["message"]
    assert "fail" in data["status"]
    assert resp.content_type == "application/json"


def test_user_registration_duplicate_username(test_app):
    add_user("test", "test@test.com", "test")
    client = test_app.test_client()
    resp = client.post(
        "/auth/register",
        data=json.dumps(
            {"username": "test", "email": "test@test.com2", "password": "test"}
        ),
        content_type="application/json",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 400
    assert "Sorry. That user already exists." in data["message"]
    assert "fail" in data["status"]
    assert resp.content_type == "application/json"


def test_user_registration_invalid_json(test_app):
    client = test_app.test_client()
    resp = client.post(
        "/auth/register", data=json.dumps({}), content_type="application/json",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 400
    assert "Invalid payload." in data["message"]
    assert "fail" in data["status"]
    assert resp.content_type == "application/json"


def test_user_registration_invalid_json_keys_no_username(test_app):
    client = test_app.test_client()
    resp = client.post(
        "/auth/register",
        data=json.dumps({"email": "test1@test.com", "password": "test"}),
        content_type="application/json",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 400
    assert "Invalid payload." in data["message"]
    assert "fail" in data["status"]
    assert resp.content_type == "application/json"


def test_user_registration_invalid_json_keys_no_email(test_app):
    client = test_app.test_client()
    resp = client.post(
        "/auth/register",
        data=json.dumps({"username": "justatest3", "password": "test"}),
        content_type="application/json",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 400
    assert "Invalid payload." in data["message"]
    assert "fail" in data["status"]
    assert resp.content_type == "application/json"


def test_user_registration_invalid_json_keys_no_password(test_app, test_database):
    client = test_app.test_client()
    resp = client.post(
        "/auth/register",
        data=json.dumps({"username": "justatest2", "email": "test2@test.com"}),
        content_type="application/json",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 400
    assert "Invalid payload." in data["message"]
    assert "fail" in data["status"]
    assert resp.content_type == "application/json"


def test_registered_user_login(test_app):
    add_user("test3", "test3@test.com", "test")
    client = test_app.test_client()
    resp = client.post(
        "/auth/login",
        data=json.dumps({"email": "test3@test.com", "password": "test"}),
        content_type="application/json",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 200
    assert "Successfully logged in." in data["message"]
    assert "success" in data["status"]
    assert data["auth_token"]
    assert resp.content_type == "application/json"


def test_not_registered_user_login(test_app, test_database):
    client = test_app.test_client()
    resp = client.post(
        "/auth/login",
        data=json.dumps({"email": "testnotreal@test.com", "password": "test"}),
        content_type="application/json",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 404
    assert "User does not exist." in data["message"]
    assert "fail" in data["status"]
    assert resp.content_type == "application/json"
