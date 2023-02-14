import React, { Component } from 'react';
// import axios from 'axios';
// import { Audio } from 'react-loader-spinner';
// import PropTypes from 'prop-types'
// import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import { Container } from './App.styled';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMore from './Button/LoadMore';
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
      this.setState({ isLoading: true, images: [], });
      try {
        const {hits, totalHits } = await fetchPhotosByQuery(query, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          showLoadMore: page < Math.ceil(totalHits / 12),
        }));
        if (hits.length === 0) {
            return alert('Nothing found for your request. Please, try again');
        }
      } catch (error) {
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearchbarSubmit = query => {
    this.setState({ query, page: 1 });
  };

  // async componentDidUpdate(_, prevState) {
  //   const prevWord = prevState.query;
  //   const nextWord = this.state.query;

  //   const prevPage = prevState.page;
  //   const nextPage = this.state.page;

  //   if (prevWord !== nextWord || prevPage !== nextPage) {
  //     this.setState({
  //       loading: true,
  //       images: [],
  //     });

              

  //     try {
  //       const response = await axios.get(
  //         `https://pixabay.com/api/?q=${nextWord}&page=${nextPage}&key=32802326-1cfc711dbce78707f39704a32&image_type=photo&orientation=horizontal&per_page=12`
  //       );
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...response.data.hits],
  //         showLoadMore: nextPage < Math.ceil(response.data.total / 12),
  //       }));
  //       // this.setState({
  //       //   images: response.data.hits,
  //       //   showLoadMore: page < Math.ceil(total_results / 12),
  //       // });

  //       if (response.data.hits.length === 0) {
  //         return alert('Nothing found for your request. Please, try again');
  //       }
  //     } catch (error) {
  //       this.setState({
  //         error: error.message,
  //       });
  //     } finally {
  //       this.setState({
  //         loading: false,
  //       });
  //     }
  //   }
  // }

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
        {isLoading && (
          <Loader/>
        )}
        {/* {images.length === 0 && <p>Nothing found for your request. Please, try again</p>} */}
        {images && <ImageGallery images={images} />}
        {showLoadMore && (
          <LoadMore onClick={this.loadMore}>Load more</LoadMore>
        )}
        
        {/* {this.state.images.length > 0 && (
          <LoadMore onClick={this.loadMore}>Load more</LoadMore>
        )} */}
        {error && <h1>{this.state.error}</h1>}
      </Container>
    );
  }
}





// return (
//   <Container>

//     <Searchbar onSubmit={this.handleSearchbarSubmit} />
//     <ImageGallery images={this.state.images} />
//   </Container>
// );

//   render() {
//     const { status, images } = this.state;

//     if (status === 'idle') {
//       return (
//         <Container>
//           <Searchbar onSubmit={this.handleSearchbarSubmit} />
//         </Container>
//       );
//     }

//     if (status === 'pending') {
//       return (
//         <Container>
//           <Searchbar onSubmit={this.handleSearchbarSubmit} />
//           <Audio
//             height="80"
//             width="80"
//             radius="9"
//             color="blue"
//             ariaLabel="loading"
//             wrapperStyle
//             wrapperClass
//           />
//           {/* <div> Loading...</div> */}
//         </Container>
//       );
//     }

//     if (status === 'resolved') {
//       return (
//         <Container>
//           <Searchbar onSubmit={this.handleSearchbarSubmit} />
//           <ImageGallery images={images} />
//           {this.state.images.length > 0 && (
//             <LoadMore onClick={this.loadMore}>Load more</LoadMore>
//           )}
//         </Container>
//       );
//     }

//     if (status === 'rejected') {
//       return (
//         <Container>
//           <Searchbar onSubmit={this.handleSearchbarSubmit} />
//           <div>{this.state.error.message}</div>

//         </Container>
//       );
//     }

//   }
// }
