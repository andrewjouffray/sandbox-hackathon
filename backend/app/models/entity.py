from app.models import db

class Entity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=True)
    type = db.Column(db.String(120), unique=False, nullable=True)
    environment = db.Column(db.String(120), unique=False, nullable=True)
    region = db.Column(db.String(120), unique=False, nullable=True)
    version = db.Column(db.String(120), unique=False, nullable=True)

    evidences = db.relationship('Evidence', back_populates='entity', lazy=True)
    reports = db.relationship('Report', back_populates='entity', lazy=True)

    system_id = db.Column(db.Integer, db.ForeignKey('system.id'), nullable=False)
    system = db.relationship('System', back_populates='entities')

    def __repr__(self):
        return f"<Entity {self.name}>"