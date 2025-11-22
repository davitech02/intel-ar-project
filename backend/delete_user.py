from app import app, db, User

with app.app_context():
    email_to_delete = "client1@test.com" # CHANGE THIS to the email you are trying to use
    
    user = User.query.filter_by(email=email_to_delete).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        print(f"Deleted {email_to_delete}. You can register it again now.")
    else:
        print("User not found.")