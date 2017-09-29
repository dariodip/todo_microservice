from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from logging import getLogger


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
log = getLogger(__name__)

socketio = SocketIO(app)

@app.route('/')
def index():
    log.info("Request for index")
    return render_template('index.html')

@socketio.on('new_tweet', namespace='/tweet')
def test_message(message):
    log.info("New tweet received")
    emit('tweet', {'data': message['data']}, broadcast=True)


@socketio.on('connect', namespace='/tweet')
def test_connect():
    log.info("New user connected")
    emit('log_message', {'data': 'Connected'})

@socketio.on('disconnect', namespace='/tweet')
def test_disconnect():
    log.info("User disconnected")
    emit("log_message", {'data': 'Disconnected'})

if __name__ == '__main__':
    socketio.run(app)
