from flask import Blueprint, jsonify, request

test_bp = Blueprint('test', __name__)

@test_bp.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Hello World!'})

@test_bp.route('/audit', methods=['POST'])
def audit():
    data = request.json
    print(data)
    return jsonify({'message': 'Audit received!'})