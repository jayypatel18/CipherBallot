from app import create_app  # Adjusted import path

# Create the Flask application instance
application = create_app()

if __name__ == '__main__':
    application.run(debug=True,port=5001)
