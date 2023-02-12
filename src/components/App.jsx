import React, { Component } from 'react';
// import PropTypes from 'prop-types'
// import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import { Container } from './App.styled';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchWord: '',
    images: [],
    error: null,
    status: 'idle',
  };

  handleSearchbarSubmit = searchWord => {
    this.setState({ searchWord });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevWord = prevState.searchWord;
    const nextWord = this.state.searchWord;

    if (prevWord !== nextWord) {
      this.setState({ status: 'pending' });
      console.log(prevWord);
      console.log(nextWord);

      fetch(
        `https://pixabay.com/api/?q=${nextWord}&page=1&key=32802326-1cfc711dbce78707f39704a32&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(alert('Nothing found for your request'))
          );
        })
        .then(({ hits }) => {
          // if ({hits}.length === 0) {
          //   return alert('Nothing found for your request');
          // }
          console.log(hits);
          this.setState({
            images: ({ hits }),
            status: 'resolved',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { status, error, images } = this.state;

    console.log(this.state.images);

    if (status === 'idle') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
        </Container>
      );
    }

    if (status === 'resolved') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
          <ImageGallery images={images} />
        </Container>
      );
    }

    // return (
    //   <Container>

    //     <Searchbar onSubmit={this.handleSearchbarSubmit} />
    //     <ImageGallery images={this.state.images} />
    //   </Container>
    // );
  }
}

