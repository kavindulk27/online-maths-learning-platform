import requests

def test_login():
    url = "http://127.0.0.1:8000/api/auth/login/"
    
    # 1. Test with Username
    payload_username = {
        "username": "test-0001",
        "password": "testpassword123"
    }
    r1 = requests.post(url, json=payload_username)
    print("Login with Username:")
    print("Status code:", r1.status_code)
    
    # 2. Test with Email
    payload_email = {
        "username": "test@example.com",
        "password": "testpassword123"
    }
    r2 = requests.post(url, json=payload_email)
    print("\nLogin with Email:")
    print("Status code:", r2.status_code)
    if r2.status_code != 200:
        print("Response:", r2.text)

if __name__ == "__main__":
    test_login()
