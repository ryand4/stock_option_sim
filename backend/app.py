from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # This will enable CORS for all domains on all routes

@app.route('/api/random-data')
def random_data():
    # Generate some random data
    data = {
        'number': random.randint(1, 100),
        'message': 'Hello from Flask!'
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Run the app on localhost port 5000
