import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { toast } from 'react-toastify';
import Button from 'components/Button/Button';
import {ReactComponent as SearchIcon} from '../icons/searchIcon.svg'
import {SearchbarHeader, SearchForm, Input} from './Searchbar.styled';




export default class Searchbar extends Component {
  state = {
    word: '',
  };

  handleChangeWord = e => {
    this.setState({ word: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.word.trim() === '') {
     alert("Please, enter a search word!");
      return;
    }

    this.props.onSubmit(this.state.word);
    this.setState({ word: '' });
  };

  render() {
    return (
      <SearchbarHeader className="searchbar" >
        <SearchForm className="form" onSubmit={this.handleSubmit}>
          <Button >
            <SearchIcon width='20' height='20'/>
          </Button>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="word"
            value={this.state.word}
            onChange={this.handleChangeWord}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}
