from app import app, db, User
from werkzeug.security import generate_password_hash

with app.app_context():
    # 1. Delete existing user with this email to avoid conflicts
    existing_user = User.query.filter_by(email="admin@intel.com").first()
    if existing_user:
        db.session.delete(existing_user)
        db.session.commit()
        print("Old admin deleted.")

    # 2. Create the new Admin
    hashed_password = generate_password_hash("123456")
    
    admin = User(
        full_name="System Admin",
        email="admin@intel.com",
        password_hash=hashed_password,
        role="admin"
    )

    db.session.add(admin)
    db.session.commit()
    
    print("------------------------------------------------")
    print("SUCCESS! User Created:")
    print("Email:    admin@intel.com")
    print("Password: 123456")
    print("------------------------------------------------")