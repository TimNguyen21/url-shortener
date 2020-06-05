import React, { Component } from 'react';
import './App.css';
import { getUrls, addUrl, deleteUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  componentDidMount = () => {
    this.setUrls();
  }

  setUrls = () => {
    getUrls()
      .then(data => this.setState({urls: data.urls}))
      .catch(error => console.log(error.message));
  }

  addNewUrl = (newUrl) => {
    addUrl(newUrl)
      .then(data => {
        this.setState({urls: [...this.state.urls, data]})
      })
      .catch(error => console.log(error.message));
  }

  deleteUrl = (id) => {
    const updateUrl = this.state.urls.filter(url => url.id !== id);
    this.setState({urls: updateUrl});
    
    deleteUrl(id)
      .catch(error => console.log(error.message))
  }

  render = () => {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addNewUrl={this.addNewUrl}/>
        </header>
        <UrlContainer urls={this.state.urls} deleteUrl={this.deleteUrl}/>
      </main>
    );
  }
}

export default App;
