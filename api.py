import flask
from os import path
from recommender import recommender
import json
import numpy as np

from flask import request

app = flask.Flask(__name__)
app.config["DEBUG"] = True


##Get Recommender Instance
recommender = recommender()


@app.route('/', methods=['GET'])
def home():
    return '''<h1>Recommender</h1>
<p>Recommender System for Mansoori Project</p>'''

@app.route('/recommend/', methods=["GET", "POST"])
def recommend():
    param = request.get_json()
    datapoint = recommender.encoding(param["products"])
    prediction = recommender.predict(reformat_datapoint(datapoint))
    #recommender.save_new_datapoint(param)
    return json.dumps(recommender.decoding(prediction).tolist())


def reformat_datapoint(datapoint):
    #formats the np arrray of product indexes to datapoint vector
    reformat = np.zeros((1,38))
    for i in datapoint:
        reformat[0][i] = 1

    return np.array(reformat)




app.run(host='0.0.0.0', port='5000')

