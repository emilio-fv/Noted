from flask_app import app
from flask import redirect, render_template, request, jsonify
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import flask_app.constants
from flask_app.controllers.helpers import login_required, sp

@app.route('/users/music/search_form') # Search Music Form
@login_required
def search_music_form(all_albums=[]):
    return render_template('music_search.html') 

@app.route('/users/music/search', methods=['POST']) # Search Music 
def search_music():
    search_input = request.form['search_input']
    search_category = request.form['search_category']
    search_results = sp.search(search_input, limit=16, offset=0, type=search_category, market=None)

    if search_category == "album": # By Album
        all_albums = []
        for album in search_results['albums']['items']:
            one_album = {
                'album_id': album['id'],  
                'album_name': album['name'],
                'artist_name': album['artists'][0]['name'],
                "album_img": album['images'][0]['url']
            }
            all_albums.append(one_album)
        return jsonify(all_albums)

    if search_category == "track": # By Track
        all_tracks = []
        for track in search_results['tracks']['items']:
            one_track = {
                'track_id': track['id'],
                'track_name': track['name'],
                'album_name': track['album']['name'],
                'artist_name': track['artists'][0]['name'],
                'album_img': track['album']['images'][0]['url']
            }
            all_tracks.append(one_track)
        return jsonify(all_tracks)

    if search_category == "artist": # By Artist
        all_artists = []
        for artist in search_results['artists']['items']:
            one_artist = {
                'artist_id': artist['id'],
                'artist_name': artist['name'],
                'artist_img': artist['images'][0]['url'] if len(artist['images']) > 0 else None
            }
            all_artists.append(one_artist)
        return jsonify(all_artists)

@app.route('/users/music/view/<album_id>') # View Album (Track)
def view_music(album_id):
    album_results = sp.album(album_id)
    album_tracks_results = sp.album_tracks(album_id)
    album_tracks = []
    for item in album_tracks_results['items']:
        album_tracks.append(item['name'])
    album_data = {
        "album_id": album_results['id'],
        "album_name": album_results['name'],
        "album_artist": album_results['artists'][0]['name'],
        "album_img": album_results['images'][0]['url'],
        "album_tracks": album_tracks
    }
    return render_template('music_view.html', album_data = album_data)

# TODO View Artist