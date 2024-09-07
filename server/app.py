# from flask import Flask, request, jsonify
# import pickle
# import numpy as np
# app = Flask(__name__)
# with open('weights.pkl', 'rb') as file:
#     model = pickle.load(file)
# @app.route('/api/predict', methods=['POST'])
# def predict():
#     data = request.json
#     if not data or 'origin' not in data or 'destination' not in data or 'weight' not in data:
#         return jsonify({'error': 'Insufficient data'}), 400

#     origin = data['origin']
#     destination = data['destination']
#     weight = data['weight']

#     # Perform prediction and calculate the estimated price
#     estimated_price = calculate_estimated_price(origin, destination, weight)

#     return jsonify({'estimated_price': estimated_price})

# def calculate_estimated_price(origin, destination, weight):
#     # Placeholder function for price calculation
#     x = np.array([origin, destination, weight]).reshape(1, -1)

#     # Pass the reshaped data to the model for prediction
#     estimated_price = model.predict(x)

#     return (estimated_price)

# if __name__ == '__main__':
#     app.run(port=5001)

from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

with open('weights.pkl', 'rb') as mfile:
    model = pickle.load(mfile)


@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    print("Received data:", data)
    weight = data['weight']
    distance = data['distance']
    loading_d = data['loading_meter']
    features = np.array([[weight, loading_d, distance]])
    results = model.predict(features)
    return jsonify({'predictions': float(results[0])})


if __name__ == '__main__':
    app.run(port=5001)
