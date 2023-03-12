import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

from . import lastfm

load_dotenv()

app = Flask(__name__)

with open("cors.allowed", "r") as f:
    allowed_origins = f.read().splitlines()
    CORS(app=app, origins=allowed_origins)


lfm = lastfm.LastFM(os.getenv("LASTFM_API_KEY"), os.getenv("LASTFM_API_SECRET"))


@app.route("/<username>")
def getinfo(username):
    request_type = request.args.get("type")

    # ?type=recent
    if request_type == "recent" or request_type is None:
        response = jsonify(lfm.get_user_recent_tracks(username, limit=4))

    response.headers.add("Access-Control-Allow-Origin", "https://bye.omg.lol")
    return response
