from flask_sqlalchemy import SQLAlchemy

# Initialize SQLAlchemy
db = SQLAlchemy()

# Import models so Flask-Migrate detects them
from app.models.entity import Entity
from app.models.evidence import Evidence
from app.models.report import Report
from app.models.system import System