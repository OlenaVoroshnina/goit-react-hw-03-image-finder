import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Searchbar from './Searchbar/Searchbar';
import { Container } from './App.styled';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMore from './LoadMore/LoadMore';
import { fetchPhotosByQuery } from 'services/Api';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    error: null,
    isLoading: false,
    showLoadMore: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true, });
      try {
        const { hits, totalHits } = await fetchPhotosByQuery(query, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          showLoadMore: page < Math.ceil(totalHits / 12),
        }));
        if (hits.length === 0) {
          return alert('Nothing found for your request. Please, try again');
        }
      } catch (error) {
        this.setState({error: error.message,})
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearchbarSubmit = query => {
    this.setState({ 
      query, 
      page: 1, 
      images: [],
      error: null,
      isLoading: false,
      showLoadMore: false,
     });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { isLoading, images, error, showLoadMore } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        {isLoading && <Loader />}
        {images && <ImageGallery images={images} />}
        {showLoadMore && <LoadMore onClick={this.loadMore}>Load more</LoadMore>}
        {error && <h1>{this.state.error}</h1>}
      </Container>
    );
  }
}

App.propTypes = {
  word: PropTypes.string,
  query: PropTypes.string,
  page: PropTypes.number,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  showLoadMore: PropTypes.bool,
  images: PropTypes.arrayOf(PropTypes.shape({
    hits: PropTypes.array.isRequired,
    totalHits: PropTypes.number.isRequired,
}))
};
