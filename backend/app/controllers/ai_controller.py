from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
from openai import OpenAI
import os, json, re
from app.logic.ai_logic import callOpenAI

load_dotenv()

apiKey = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/ai/analyze', methods=['POST'])
def analyze():
    """
    Endpoint to analyze a given prompt using OpenAI's API.
    Expects a JSON payload with 'prompt'. Optionally 'model', and 'system_message'.
    """
    data = request.get_json()
    prompt = data.get('prompt')
    model = data.get('model', "gpt-4o-mini")
    system_message = data.get('system_message', "You are an AI that only responds in JSON format.")

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    try:
        messages = [{"role": "user", "content": prompt}]
        completion = callOpenAI(messages, model, system_message)

        if isinstance(completion, dict) and "error" in completion:
            return jsonify(completion), 500

        response_text = completion.choices[0].message.content

        try:
            return jsonify(json.loads(response_text))
        except json.JSONDecodeError:
            return jsonify({"error": "Response was not in JSON format", "response": response_text})

    except Exception as e:
        return jsonify({"error": f"Unexpected error: {e}"}), 500


@ai_bp.route('/ai/test', methods=['GET'])
def test():
    """
    Test endpoint to verify the AI service is running.
    """
    return jsonify({"message": "AI service is running"}), 200
    