from dotenv import load_dotenv
from openai import OpenAI
import os, json

load_dotenv()

apiKey = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def callOpenAI(messages, model="gpt-4o-mini", system_message="You are a helpful assistant."):
    """
    Calls OpenAI API with a dynamic message list and an optional system instruction.
    
    :param messages: List of message dictionaries with 'role' and 'content'.
    :param model: The OpenAI model to use.
    :param system_message: A system instruction to guide the assistant.
    :return: The assistant's response (preferably in JSON format).
    """
    try:
        full_messages = [{'role': 'system', 'content': system_message}] + messages

        completion = client.chat.completions.create(
            model=model,
            messages=full_messages
        )
        
        return completion

    except Exception as e:
        return {"error": f"Error calling OpenAI: {e}"}
    

