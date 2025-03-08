from app.models import db

class Report(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    standard = db.Column(db.String(120), unique=False, nullable=True) # GDRP, CCPA
    reportee = db.Column(db.String(120), unique=False, nullable=True) # system / device / deployment 
    compliant = db.Column(db.Boolean, default=False, nullable=True)
    recommendation = db.Column(db.String(600), unique=False, nullable=True)
    more_info_request = db.Column(db.String(600), unique=False, nullable=True)

    entity_id = db.Column(db.Integer, db.ForeignKey('entity.id'), nullable=False)
    entity = db.relationship('Entity', back_populates='reports')

    def __repr__(self):
        return f"<System {self.name}>"