from flask import Flask

app = Flask(__name__)

from app.controllers.test_controller import test_bp

app.register_blueprint(test_bp)
