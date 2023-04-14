from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask import Flask, request, send_file, Response
from flask_cors import CORS
import base64
import json
import boto3
import os

ACCESS_KEY_ID = os.environ.get('ACCESS_KEY_ID')
SECRET_ACCESS_KEY = os.environ.get('SECRET_ACCESS_KEY')

client = boto3.client('rekognition',region_name='us-west-2',aws_access_key_id=ACCESS_KEY_ID,aws_secret_access_key=SECRET_ACCESS_KEY )

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

@app.route('/image', methods=['POST','GET'])
def index():
    """
    POST route handler that accepts an image, manipulates it and returns a JSON containing a possibly different image with more fields
    """
    # Read image from request and write to server's file system
    data = request.files['file'] 

    # Do something with the image e.g. transform, crop, scale, computer vision detection
    # some_function_you_want()

    # Return the original/manipulated image with more optional data as JSON
    saved_img = data.read() # Read as binary
    saved_img_b64 = base64.b64encode(saved_img).decode('utf-8') # UTF-8 can be converted to JSON
    detect_explict = client.detect_moderation_labels(Image={'Bytes': saved_img})
    print(detect_explict)
    response = {}
    response['data'] = saved_img_b64
    response['more_fields'] = detect_explict # Can return values such as Machine Learning accuracy or precision

    # If only the image is required, you can use send_file instead
    # return send_file('save_pic.jpg', mimetype='image/jpg') 
    return Response(json.dumps(response))