import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from "./components/video_detail";

const YOUTUBE_API_KEY = 'AIzaSyBzhtf19k_kI8l-sgtiynDXdIpMXIS9HiY';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('surfboards');
  }

  videoSearch = (searchTerm) => {
    YTSearch({ key: YOUTUBE_API_KEY, term: searchTerm }, (videos) => {
      this.setState({ videos: videos, selectedVideo: videos[0] });
    });
  };

  render() {
    return (
      <div>
        <SearchBar onSearchTermChange={term => this.videoSearch(term)}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('.container'));