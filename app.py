from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask import Flask, request, send_file, Response
from flask_cors import CORS
import base64
import json
import boto3

access_key_id='AKIA2RN6HH2WVXKWLK5W'
secret_access_key='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'

client = boto3.client('rekognition',region_name='us-west-2',aws_access_key_id=access_key_id,aws_secret_access_key=secret_access_key )

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
    data.save('save_pic.jpg')

    # Do something with the image e.g. transform, crop, scale, computer vision detection
    # some_function_you_want()

    # Return the original/manipulated image with more optional data as JSON
    saved_img = open('save_pic.jpg', 'rb').read() # Read as binary
    saved_img_b64 = base64.b64encode(saved_img).decode('utf-8') # UTF-8 can be converted to JSON
    detect_explict = client.detect_moderation_labels(Image={'Bytes': saved_img})
    print(detect_explict)
    response = {}
    response['data'] = saved_img_b64
    response['more_fields'] = detect_explict # Can return values such as Machine Learning accuracy or precision

    # If only the image is required, you can use send_file instead
    # return send_file('save_pic.jpg', mimetype='image/jpg') 
    return Response(json.dumps(response))