from flask import Flask, request, send_file
import os
from bullbear import generate_plot  # Import the function from bullbear.py
from flask_cors import CORS  # Add CORS handling
import logging  # Add logging

# Initialize the Flask app
app = Flask(__name__)

# Enable CORS for the app
CORS(app)

# Set up basic logging
logging.basicConfig(level=logging.DEBUG)

# Default route
@app.route('/')
def hello_world():
    return "Hello, World! Your Flask app is running."

# Route for plotting moving averages
@app.route('/plot', methods=['GET'])
def get_plot():
    ticker = request.args.get('ticker', default='AAPL').upper()  # Default to AAPL if no ticker is provided
    timeframe = request.args.get('timeframe', default='5y')  # Default to 5 years if no timeframe is provided
    ma_list = request.args.get('ma', default='50,100,200').split(',')  # Default to 50, 100, 200 MA

    try:
        # Use the generate_plot function from bullbear.py
        generate_plot(ticker, timeframe, ma_list)  # Pass the ticker, timeframe, and MA list
        
        # Path to the generated plot
        file_path = os.path.join(os.getcwd(), 'stock_price_with_ma.png')
        
        # If the file exists, send it back to the user
        if os.path.exists(file_path):
            return send_file(file_path, mimetype='image/png')
        else:
            return "File not found", 404
    except Exception as e:
        app.logger.error(f"Error generating plot: {str(e)}")
        return f"An error occurred: {str(e)}", 500

# Health check route (optional, but useful for testing)
@app.route('/health', methods=['GET'])
def health_check():
    return "OK", 200

if __name__ == '__main__':
    # Use dynamic port assignment, default to port 5000 for local testing
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)





# from flask import Flask, request, jsonify, send_file
# from flask_cors import CORS
# import yfinance as yf
# import os
# from bullbear import generate_plot  # Existing import
# from stock_predictor import train_and_predict  # New import for stock prediction
# import logging

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Set up basic logging
# logging.basicConfig(level=logging.DEBUG)

# # Existing route for plotting moving averages
# @app.route('/plot', methods=['GET'])
# def get_plot():
#     ticker = request.args.get('ticker', default='AAPL').upper()  # Default to AAPL if no ticker is provided
#     timeframe = request.args.get('timeframe', default='5y')  # Default to 5 years if no timeframe is provided
#     ma_list = request.args.get('ma', default='50,100,200').split(',')  # Default to 50, 100, 200 MA
    
#     try:
#         generate_plot(ticker, timeframe, ma_list)  # Pass the ticker, timeframe, and MA list
#         file_path = os.path.join(os.getcwd(), 'stock_price_with_ma.png')
#         if os.path.exists(file_path):
#             return send_file(file_path, mimetype='image/png')
#         else:
#             return "File not found", 404
#     except Exception as e:
#         app.logger.error(f"Error generating plot: {str(e)}")
#         return f"An error occurred: {str(e)}", 500

# # New route for stock price prediction
# @app.route('/train-predict', methods=['POST'])
# def stock_prediction():
#     try:
#         # Get the stock ticker and prediction days from the request
#         data = request.json
#         ticker = data.get('ticker', 'AAPL')
#         prediction_days = data.get('prediction_days', 30)

#         app.logger.info(f"Fetching data for {ticker} with {prediction_days} prediction days.")
        
#         # Call the train_and_predict function from stock_prediction.py
#         prediction_result = train_and_predict(ticker, prediction_days)
        
#         app.logger.info(f"Prediction result: {prediction_result}")

#         return jsonify(prediction_result)
#     except Exception as e:
#         app.logger.error(f"Error during stock prediction: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# # New route to fetch option data
# @app.route('/api/aapl-option', methods=['GET'])
# def get_option_data():
#     try:
#         ticker = 'AAPL'
#         stock = yf.Ticker(ticker)
#         option_dates = stock.options

#         # Fetch options chain for the nearest expiration date
#         options_chain = stock.option_chain(option_dates[0])
#         call_options = options_chain.calls

#         # Extract only necessary fields
#         options_data = call_options[['strike', 'lastPrice', 'volume']].to_dict(orient='records')

#         return jsonify(options_data)
#     except Exception as e:
#         app.logger.error(f"Error fetching option data: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# @app.route('/health', methods=['GET'])
# def health_check():
#     return "OK", 200

# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 5000))  # Fallback to 5000 for local testing
#     app.run(debug=True, host='0.0.0.0', port=port)
