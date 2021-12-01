'''
Backend implementation of the HATS search application.
'''

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def get_root():
    '''
    Return the root of the API.
    '''
    return jsonify({'message': 'Welcome to the HATS API!'})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=9999, debug=True)
