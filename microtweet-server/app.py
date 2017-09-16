import os
from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ['SECRET']
socketio = SocketIO(app)


@app.route('/')
def home():
    return render_template('index.html')

@socketio.on('new_tweet', namespace='/tweet')
def new_tweet(tweet):
    print(tweet)
    emit('ok')


@socketio.on('connect', namespace='/tweet')
def connect():
    print("Connected")
    emit('client_connected', broadcast=True)

@socketio.on('disconnect', namespace='/tweet')
def disconnect():
    print("Disconnected")
    emit('client_disconnected', broadcast=True)


if __name__ == '__main__':
    socketio.run(app)


