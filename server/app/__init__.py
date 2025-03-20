from flask import Flask
from flask_cors import CORS

def create_app():
    # Create a new Flask app instance inside the function
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    # Import and register blueprints
    from .routes import bp
    app.register_blueprint(bp)
    
    return app

# Assign the result of create_app to the application variable
application = create_app()