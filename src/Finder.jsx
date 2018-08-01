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
      }
    });

    return musics;
  }

  async getPlaylists(url) {
    const endpoint = url ? url : 'https://api.spotify.com/v1/users/12142453227/playlists';

    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.hash}`,
      },
      url: 'https://api.spotify.com/v1/users/12142453227/playlists',
    };

    const response = await axios(options);
    const playlist = await Promise.all(response.data.items.map(async (item) => {
      return {
        id: item.id,
        name: item.name,
        trackEndpoint: await this.getTracks(item.tracks.href),
      }
    }));

    await this.setState({
      playlists: [...playlist],
    });
  }

  render() {
    return (
      <div>
        playlists
        {this.state.playlists.map(item => (
          <div key={item.id}>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Finder;
