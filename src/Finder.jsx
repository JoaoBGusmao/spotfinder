import React, { Component } from 'react';
import axios from 'axios';

class Finder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: [],
    }
  }

  componentDidMount() {
    this.getPlaylists();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getTracks(url) {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.hash}`,
      },
      url: `${url}?fields=items(track(album(name),artists(name),name))`,
    };

    const response = await axios(options);
    const track = response.data;

    const musics = response.data.items.map((item) => {
      return {
        name: item.track.name,
        album: item.track.album.name,
        artists: item.track.artists[0].name,
      }
    });

    return musics;
  }

  async getPlaylists(url) {
    const endpoint = url ? url : 'https://api.spotify.com/v1/users/12142453227/playlists?offset=0&limit=50';
    await this.sleep(300);
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.hash}`,
      },
      url: endpoint,
    };

    const response = await axios(options);
    const playlist = await Promise.all(response.data.items.map(async (item) => {
      return {
        id: item.id,
        name: item.name,
        tracks: await this.getTracks(item.tracks.href),
      }
    }));

    await this.setState({
      playlists: [...this.state.playlists, ...playlist],
    });

    if (response.data.next) {
      console.log(response.data.next);
      setTimeout(() => this.getPlaylists(response.data.next), 300);
    }
  }

  render() {
    return (
      <div>
        playlists
        {this.state.playlists.map(item => (
          <div key={item.id}>
            <strong>{item.name}</strong>
            {item.tracks.map(music => (
              <p>{music.name}</p>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Finder;
