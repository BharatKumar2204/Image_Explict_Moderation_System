from flask_restful import Api, Resource, reqparse
from flask import  request
import boto3
import cv2

access_key_id='AKIA2RN6HH2WVXKWLK5W'
secret_access_key='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'


class detect_explict(Resource):
  def get(self):
    return {
      'resultStatus': 'SUCCESS',
      'message': "Hello Api Handler"
      }

  def post(self):
    print(self)
    parser = reqparse.RequestParser()
    parser.add_argument('type', type=str)
    parser.add_argument('message', type=str)

    args = parser.parse_args()
    #files = request.files
    #file = files.get('file')
    print(args)
    # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')
    #https://image-explict-production.up.railway.app
    request_type = args['type']
    request_json = args['message']
    # ret_status, ret_msg = ReturnData(request_type, request_json)
    # currently just returning the req straight
    client = boto3.client('rekognition',region_name='us-west-2',aws_access_key_id=access_key_id,aws_secret_access_key=secret_access_key )

    photo = 'api/test.jpg'
    with open(photo, 'rb') as image_file:
      source_bytes = image_file.read()

    detect_explict = client.detect_protective_equipment(Image={'Bytes': source_bytes})
    print(detect_explict)

    ret_status = request_type
    ret_msg = detect_explict

    if ret_msg:
      message = "Your Message Requested: {}".format(ret_msg)
    else:
      message = "No Msg"
    
    final_ret = {"status": "Success", "message": message}

    return final_ret