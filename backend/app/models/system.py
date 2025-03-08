from app.models import db

class System(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=True)
    region = db.Column(db.String(120), unique=False, nullable=True)

    entities = db.relationship('Entity', back_populates='system', lazy=True)

    def __repr__(self):
        return f"<System {self.name}>"