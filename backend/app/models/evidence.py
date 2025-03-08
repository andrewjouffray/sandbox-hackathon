from app.models import db

class Evidence(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    service_name = db.Column(db.String(120), unique=False, nullable=True)
    event_type = db.Column(db.String(30), unique=False, nullable=True) # save, receive, send
    data_type = db.Column(db.String(120), unique=False, nullable=True)
    identifiable = db.Column(db.Boolean, default=False, nullable=True)
    personal = db.Column(db.Boolean, default=False, nullable=True)
    encrypted = db.Column(db.Boolean, default=False, nullable=True)
    medical = db.Column(db.Boolean, default=False, nullable=True)

    # Foreign Key (Links evidence to an entity)
    entity_id = db.Column(db.Integer, db.ForeignKey('entity.id'), nullable=False)

    # Relationship (Allows access to the entity from an Evidence object)
    entity = db.relationship('Entity', back_populates='evidences')

    def __repr__(self):
        return f"<Evidence {self.event_type}>"