from flask import Blueprint, jsonify, request

test_bp = Blueprint('test', __name__)

@test_bp.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Hello World!'})