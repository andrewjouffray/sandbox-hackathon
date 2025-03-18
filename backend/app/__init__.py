import os
from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

from app.controllers.test_controller import test_bp
from app.controllers.ai_controller import ai_bp
from app import models

app.register_blueprint(test_bp)
app.register_blueprint(ai_bp)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# Initialize database
from app.models import db
db.init_app(app)
migrate = Migrate(app, db)
