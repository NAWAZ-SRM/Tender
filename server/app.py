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
    weight = float(data['weight'])
    distance = float(data['distance'])
    # loading_d = float(data['loading_meter'])
    loading_d = 0.000195

    features = np.array([[weight, loading_d, distance]])
    features = features.astype(float)
    results = model.predict(features)
    return jsonify({'predictions': float(results[0])})


if __name__ == '__main__':
    app.run(port=5001)
