# from flask import Flask, jsonify
# from flask_cors import CORS
# import yfinance as yf
from yahoo_fin import options

# Get options data for Apple
aapl_options = options.get_options_chain("TSLA", 'August 2, 2024')

print(aapl_options['calls'])  # Print call options data
print(aapl_options['puts'])   # Print put options data


# app = Flask(__name__)
# CORS(app)  # Enable CORS for all domains on all routes

# @app.route('/api/aapl-option')
# def get_aapl_option():
#     aapl = yf.Ticker("AAPL")
#     try:
#         first_exp = aapl.options[0]
#         opt = aapl.option_chain(first_exp)
#         first_call = opt.calls.iloc[0].to_dict()
#     except Exception as e:
#         return jsonify({'error': str(e)})

#     return jsonify(first_call)

# if __name__ == '__main__':
#     app.run(debug=True)


