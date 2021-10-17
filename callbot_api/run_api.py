from flask import Flask, request, make_response, jsonify, send_file, Response
from flask.views import MethodView
from flask_restful import Api
import json

from flask_cors import CORS

import ssl

from session_process import session_manager
from session_process import response_callbot

from speech_english import get_english_audios_buf


class CallbotProcess(MethodView):
    def get(self):
        return None

    def post(self):
        req = request.get_json(force=True)  # parse json string
        session_name = req["session_name"]
        user_conversation = req["conversation"]
        print(session_name + "(user): " + user_conversation)
        
        session_manager(session_name)
        callbot_reply = response_callbot(session_name, user_conversation)
        print(session_name + "(callbot): " + callbot_reply)

        audios_buf = get_english_audios_buf(callbot_reply)

        return Response(audios_buf, mimetype="audio/wav")
    

def create_app(test_config=None):
    app = Flask(__name__)
    CORS(app)

    api = Api(app)
    api.add_resource(CallbotProcess, "/callbot")

    return app


if __name__ == "__main__":
    # ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    # ssl_context.load_cert_chain(
    #     certfile="cert/STAR_sumai_co_kr.crt", keyfile="cert/STAR_sumai_co_kr_key.txt"
    # )
    app = create_app()

    # app.run(host="0.0.0.0", port=443, ssl_context=ssl_context, threaded=True)
    app.run(host="0.0.0.0", port="8080")
