import requests

USER_AGENT = 'byemc/last_fm_wrapper::byemc.xyz'

class LastFM:
    def __init__(self, api_key, api_secret):
        self.api_key = api_key
        self.api_secret = api_secret
        self.session = requests.Session()

    # User
    def get_user_info(self, user):
        return self.session.get('http://ws.audioscrobbler.com/2.0/', params={
            'method': 'user.getinfo',
            'user': user,
            'api_key': self.api_key,
            'format': 'json'
        }).json()

    def get_user_top_artists(self, user, period='overall'):
        return self.session.get('http://ws.audioscrobbler.com/2.0/', params={
            'method': 'user.gettopartists',
            'user': user,
            'period': period,
            'api_key': self.api_key,
            'format': 'json'
        }).json()

    def get_user_top_tracks(self, user, period='overall'):
        return self.session.get('http://ws.audioscrobbler.com/2.0/', params={
            'method': 'user.gettoptracks',
            'user': user,
            'period': period,
            'api_key': self.api_key,
            'format': 'json'
        }).json()

    def get_user_top_albums(self, user, period='overall'):
        return self.session.get('http://ws.audioscrobbler.com/2.0/', params={
            'method': 'user.gettopalbums',
            'user': user,
            'period': period,
            'api_key': self.api_key,
            'format': 'json'
        }).json()

    def get_user_recent_tracks(self, user, limit=10):
        return self.session.get('http://ws.audioscrobbler.com/2.0/', params={
            'method': 'user.getrecenttracks',
            'user': user,
            'limit': limit,
            'api_key': self.api_key,
            'format': 'json'
        }).json()
