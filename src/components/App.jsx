import React, { Component } from 'react';
// import PropTypes from 'prop-types'
// import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    searchWord:"",
    images: [],
    error: null,
    status: 'idle',
  };

  handleSearchbarSubmit = searchWord =>{
    this.setState({searchWord});
  }

  componentDidUpdate(prevProps, prevState) {
    const prevWord = prevState.searchWord;
    const nextWord = this.state.searchWord;

    

    if (prevWord !== nextWord) {
      this.setState({ status: 'pending' });
      console.log(prevWord);
      console.log(nextWord);
    
    fetch(
      `https://pixabay.com/api/?q=${nextWord}&page=1&key=32802326-1cfc711dbce78707f39704a32&image_type=photo&orientation=horizontal&per_page=12`
    ).then(response =>{
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error(alert('Nothing found for your request'))
      )
    }).then(
      ({hits}) => {
        // if ({hits}.length === 0) {
        //   return alert('Nothing found for your request');
        // }
        this.setState({
        images:{hits}, 
        status:'resolved'})}
      
    ).catch(error => this.setState({error, status:'rejected'}));
    }
  }


  render() {
    return (
      <Container>
        <Searchbar onSubmit = {this.handleSearchbarSubmit} />

        {/* <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        /> */}
        {/* <ImageGallery>
          <ImageGalleryItem></ImageGalleryItem>
        </ImageGallery>
        <Button></Button>
        <Modal></Modal>
        <Loader></Loader> */}
      </Container>
    );
  }
}
