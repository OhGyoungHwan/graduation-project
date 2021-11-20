import datetime
import time
import threading

from blender_bot_1_small import request_blenderbot_small
from blender_bot_1_400M import request_blenderbot


session = {}
def create_session(session_name):
    if session.get(session_name) is None:
        session[session_name] = [None]


def update_session_time(session_name):
    session_expire_period = 30  # 분
    session[session_name][0] = datetime.datetime.now() + datetime.timedelta(minutes=session_expire_period)


def delete_session_schedule():
    now = datetime.datetime.now()

    delete_target_list = [session_name for session_name, session_info in session.items() if session_info[0] < now]
    list(map(session.pop, delete_target_list))
    if 0 < len(delete_target_list):
        print("delete session:", delete_target_list)

    threading.Timer(60, delete_session_schedule).start()


def session_manager(session_name):
    create_session(session_name)
    update_session_time(session_name)


def delete_conversation_session(session_name):
    max_conversation_count = 5
    if max_conversation_count < len(session[session_name]):
        del session[session_name][1]


def add_conversation_session(session_name, conversation):
    session_copy = session.get(session_name)
    session_copy.append(conversation)
    session[session_name] = session_copy
    delete_conversation_session(session_name)


def response_callbot(session_name, conversation):
    add_conversation_session(session_name, conversation)

    session_copy = session.get(session_name)
    # response_callbot_conversation = request_blenderbot_small(session_copy)
    response_callbot_conversation = request_blenderbot(session_copy)
    add_conversation_session(session_name, response_callbot_conversation)

    return response_callbot_conversation


def get_last_conversation(session_name):
    if session_name in session:
        session_last_index = len(session[session_name]) - 1
        print(session[session_name][session_last_index])
        return session[session_name][session_last_index]
    else:
        return None


delete_session_schedule()

