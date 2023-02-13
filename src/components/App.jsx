import React, { Component } from 'react';
import axios from "axios";
// import PropTypes from 'prop-types'
// import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import { Container } from './App.styled';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMore from './Button/LoadMore';

export class App extends Component {
  state = {
    searchWord: '',
    images: [],
    page: 1,
    error: null,
    status: 'idle',
  };

  handleSearchbarSubmit = searchWord => {
    this.setState({ searchWord, page:1, });
  };

  async componentDidUpdate(_, prevState) {
    const prevWord = prevState.searchWord;
    const nextWord = this.state.searchWord;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevWord !== nextWord || prevPage !== nextPage) {
      this.setState({ status: 'pending' });
      
      try {
        const response = await axios.get(`https://pixabay.com/api/?q=${nextWord}&page=${nextPage}&key=32802326-1cfc711dbce78707f39704a32&image_type=photo&orientation=horizontal&per_page=12`);
        this.setState({ images: response.data.hits, status:'resolved' });
        if (response.data.hits.length === 0) {
            return alert('Nothing found for your request. Please, try again');
          }
      } catch (error) {

        this.setState({error, status: 'rejected'});
        // if (response.status === !ok) {
        //   return Promise.reject(
        //           new Error(alert('Nothing found for your request')))
        //       }
        // if (this.state.images.length === 0) {
        //   return alert('Nothing found for your request');
        // }
        
      }

      // fetch(
      //   `https://pixabay.com/api/?q=${nextWord}&page=1&key=32802326-1cfc711dbce78707f39704a32&image_type=photo&orientation=horizontal&per_page=12`
      // )
      //   .then(response => {
      //     if (response.ok) {
      //       return response.json();
      //     }
      //     return Promise.reject(
      //       new Error(alert('Nothing found for your request'))
      //     );
      //   })
      //   .then(({ hits }) => {
      //     // if ({hits}.length === 0) {
      //     //   return alert('Nothing found for your request');
      //     // }
      //     console.log(hits);
      //     this.setState({
      //       images: ({ hits }),
      //       status: 'resolved',
      //     });
      //   })
      //   .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }

  render() {
    const { status, images } = this.state;

    if (status === 'idle') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
        </Container>
      );
    }

    if (status === 'pending') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
          <div> Loading...</div>
        </Container>
      );
    }

    if (status === 'resolved') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
          <ImageGallery images={images} />
          {this.state.images.length > 0 && <LoadMore onClick={this.loadMore}>Load more</LoadMore>}
        </Container>
      );
    }

    if (status === 'rejected') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
          {this.state.images.length === 0 ? <div>Nothing found for your request. Try again</div> : null}
          {/* <ImageGallery images={images} />
          <LoadMore onClick={this.loadMore}>Load more</LoadMore> */}
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

