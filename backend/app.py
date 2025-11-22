from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from urllib.parse import quote_plus
from openai import OpenAI
import os

app = Flask(__name__)

# --- CONFIGURATION ---

# 1. Database Setup
# Using your specific DB password
encoded_password = quote_plus("Davitech2002#@$$") 

db_url = os.environ.get("DATABASE_URL")
if db_url and db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = db_url or f'postgresql://postgres:{encoded_password}@localhost/intel_ARDB'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'super-secret-intel-ar-key'

# 2. OpenAI Setup
# ⚠️ ACTION REQUIRED: PASTE YOUR REAL "sk-..." KEY HERE ⚠️
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY") 

# Initialize OpenAI Client
try:
    client = OpenAI(api_key=OPENAI_API_KEY)
except Exception as e:
    print(f"⚠️ OpenAI Client Init Warning: {e}")

db = SQLAlchemy(app)
# Allow all origins to fix any CORS connection issues
CORS(app, resources={r"/*": {"origins": "*"}})
jwt = JWTManager(app)

# --- DATABASE MODELS ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), default='client')
    projects = db.relationship('Project', backref='owner', lazy=True)
    tickets = db.relationship('Ticket', backref='owner', lazy=True)

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), default='Pending')
    location = db.Column(db.String(100))
    progress = db.Column(db.Integer, default=0)
    nodes = db.Column(db.Integer, default=0)
    load_level = db.Column(db.String(20), default='Low')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    priority = db.Column(db.String(20), default='Medium')
    status = db.Column(db.String(20), default='Open')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class SystemSettings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content_store_size = db.Column(db.Integer, default=1024)
    forwarding_strategy = db.Column(db.String(50), default='best-route')
    mfa_enabled = db.Column(db.Boolean, default=False)

# --- INITIALIZE DB & CREATE DEFAULT ADMIN ---
with app.app_context():
    db.create_all()
    
    # 1. Create Default Settings if missing
    if not SystemSettings.query.first():
        db.session.add(SystemSettings())
    
    # 2. AUTOMATICALLY CREATE THE ADMIN (admin@intel.com / 123456)
    # This ensures your dashboard stats never show "0" and you can always login
    admin_email = "admin@intel.com"
    if not User.query.filter_by(email=admin_email).first():
        print(f"⚙️ System: Creating default Admin User ({admin_email})...")
        # Hash the password "123456"
        admin_pw = generate_password_hash("123456")
        admin = User(
            full_name="System Admin", 
            email=admin_email, 
            password_hash=admin_pw, 
            role="admin"
        )
        db.session.add(admin)
    
    db.session.commit()

# --- AUTH ROUTES ---
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"msg": "Email already exists"}), 400
    hashed_pw = generate_password_hash(data['password'])
    new_user = User(full_name=data['fullName'], email=data['email'], password_hash=hashed_pw, role=data.get('role', 'client'))
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity={'id': user.id, 'role': user.role, 'name': user.full_name})
        return jsonify({"token": access_token, "user": {"id": user.id, "name": user.full_name, "email": user.email, "role": user.role}}), 200
    return jsonify({"msg": "Invalid credentials"}), 401

# --- PROJECT & TICKET ROUTES ---
@app.route('/api/projects', methods=['GET'])
@jwt_required()
def get_projects():
    current_user = get_jwt_identity()
    if current_user['role'] == 'admin':
        projects = Project.query.all()
    else:
        projects = Project.query.filter_by(user_id=current_user['id']).all()
    output = [{'id': p.id, 'name': p.name, 'status': p.status, 'nodes': p.nodes, 'progress': p.progress, 'location': p.location} for p in projects]
    return jsonify(output)

@app.route('/api/tickets', methods=['GET'])
@jwt_required()
def get_tickets():
    current_user = get_jwt_identity()
    if current_user['role'] == 'admin':
        tickets = Ticket.query.all()
    else:
        tickets = Ticket.query.filter_by(user_id=current_user['id']).all()
    output = [{'id': t.id, 'topic': t.topic, 'status': t.status} for t in tickets]
    return jsonify(output)

# --- ADMIN STATS ROUTE ---
@app.route('/api/admin/stats', methods=['GET'])
@jwt_required()
def get_admin_stats():
    # Fetch real counts from the database
    total_users = User.query.count()
    total_projects = Project.query.count()
    active_projects = Project.query.filter_by(status='Active').count()
    open_tickets = Ticket.query.filter_by(status='Open').count()
    
    # Print to terminal to verify database is connected
    print(f"📊 DEBUG STATS: Users={total_users}, Projects={total_projects}")
    
    return jsonify({
        "total_users": total_users,
        "total_projects": total_projects,
        "active_nodes": active_projects * 12, # Simulation logic for nodes
        "open_tickets": open_tickets
    })

# --- CONTACT FORM (Simulation Mode) ---
# This fixes the "Failed to send" error by successfully printing to console
@app.route('/api/contact', methods=['POST'])
def contact_us():
    data = request.get_json()
    print("------------------------------------------------")
    print("\n📨 [MOCK EMAIL] Contact Form Received:")
    print(f"From: {data.get('name')} ({data.get('email')})")
    print(f"Message: {data.get('message')}\n")
    print("------------------------------------------------")
    return jsonify({"msg": "Message sent successfully!"}), 200

# --- CAREERS FORM (Simulation Mode) ---
# This fixes the "Application Failed" error
@app.route('/api/careers/apply', methods=['POST'])
def apply_career():
    name = request.form.get('name')
    role = request.form.get('role')
    print("------------------------------------------------")
    print(f"\n💼 [MOCK EMAIL] Job Application Received:")
    print(f"Applicant: {name} for {role}")
    print("CV/Resume: File received (Simulated upload)\n")
    print("------------------------------------------------")
    return jsonify({"msg": "Application submitted successfully!"}), 200

# --- CHATBOT ROUTE ---
@app.route('/api/ai-chat', methods=['POST'])
def ai_chat():
    data = request.get_json()
    user_message = data.get('message', '')

    system_prompt = """
    You are the Intel-AR Assistant. 
    1. Answer questions about ICN (Information Centric Networking) and AR.
    2. Guide users to the Dashboard for project management.
    3. If you don't know, ask them to contact support@intel-ar.ca.
    """

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ]
        )
        bot_reply = response.choices[0].message.content
        return jsonify({"reply": bot_reply})
    
    except Exception as e:
        # Prints the EXACT OpenAI error to your terminal
        print("------------------------------------------------")
        print(f"❌ OPENAI ERROR: {str(e)}") 
        print("------------------------------------------------")
        
        return jsonify({"reply": "I am offline. Please check the server console for the error logs."}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)