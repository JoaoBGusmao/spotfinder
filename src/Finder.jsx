import React, { Component } from 'react';
import axios from 'axios';

class Finder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: [],
      searching: '',
      found: [],
      errors: [],
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    this.getPlaylists();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getTracks(url) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.props.hash}`,
        },
        url: `${url}?fields=items(track(album(name),artists(name),name, id))`,
      };

      const response = await axios(options);
      const track = response.data;

      const musics = response.data.items.map((item) => {
        return {
          id: item.track.id,
          name: item.track.name,
          album: item.track.album.name,
          artist: item.track.artists[0].name,
        }
      });
      return musics;

    } catch (err) {
      const status = err.response.status;

      if (status === 429) {
        const waitTime = parseInt(err.response.headers['retry-after'], 10);

        await this.sleep(waitTime * 1000);
        return this.getTracks(url);
      }
      return [];
    }

  }

  async getPlaylists(url) {
    try {
      const endpoint = url ? url : 'https://api.spotify.com/v1/users/12142453227/playlists?offset=0&limit=50';

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
        setTimeout(() => this.getPlaylists(response.data.next), 300);
      }
    } catch (err) {
      const status = err.response.status;

      if (status === 401) {
        window.location.href = "/";
      }

      if (status === 429) {
        const waitTime = parseInt(err.response.headers['retry-after'], 10);

        await this.sleep(waitTime * 1000);
        return this.getPlaylists(url);
      }
      return {};
    }
  }

  getFiltered() {
    const result = [];

    if (this.state.searching.length < 3) {
      return result;
    }

    const search = this.state.playlists.forEach(playlist => {
      const playlistName = playlist.name;

      const found = playlist.tracks.forEach(track => {
        if (track.name.toLowerCase().includes(this.state.searching.toLowerCase())
          || track.album.toLowerCase().includes(this.state.searching.toLowerCase())
          || track.artist.toLowerCase().includes(this.state.searching.toLowerCase())) {
          result.push({
            id: track.id,
            playlist: playlistName,
            track: track.name,
            artist: track.artist,
            album: track.album,
          });
        }
      });
    });

    return result.filter((obj, pos, arr) =>
      arr.map(mapObj => mapObj['id']).indexOf(obj['id']) === pos
    );
  }

  async handleSearchChange(e) {
    await this.setState({
      searching: e.target.value,
    });

    this.setState({
      found: this.getFiltered(),
    });
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleSearchChange} />
        <table>
          <thead>
            <tr>
              <th className="table-music">Musica</th>
              <th className="table-artist">Artista</th>
              <th className="table-album">Álbum</th>
              <th className="table-playlist">Playlist</th>
            </tr>
          </thead>
          <tbody>
            {this.state.found.length > 0 ?
              this.state.found.map(music => (
                <tr key={music.id}>
                  <td>{music.track}</td>
                  <td className="table-small">{music.artist}</td>
                  <td className="table-small">{music.album}</td>
                  <td className="table-small">{music.playlist}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4">Busque algo</td>
                </tr>
              )
            }
          </tbody>
        </table>

        <p>Playlists carregadas: {this.state.playlists.length}</p>
      </div>
    );
  }
}

export default Finder;
