import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { toast } from 'react-toastify';
import Button from 'components/Button/Button';
import {ReactComponent as SearchIcon} from '../icons/searchIcon.svg'
// import { BiSearchAlt2 } from "react-icons/bi";
import {SearchbarHeader} from '../App.styled';


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
        <form className="form" onSubmit={this.handleSubmit}>
          {/* <button type="submit" class="button">
            <span class="button-label">Search</span>
          </button> */}
          <Button >
            {/* <BiSearchAlt2 widths='40' height= '40'/> */}
            <SearchIcon width='10' height='10'/>
          </Button>
          <input
            type="text"
            // className="input"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            name="word"
            value={this.state.word}
            onChange={this.handleChangeWord}
          />
        </form>
      </SearchbarHeader>
    );
  }
}
