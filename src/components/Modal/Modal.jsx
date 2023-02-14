import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalContent, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    console.log(Modal);
    window.addEventListener('keydown', this.handleKeyDown);
  };

  componentWillUnmount(){
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = e =>{
    if (e.code === 'Escape') {
      this.props.onClick();
    }
  };

  handleOverlayClick = e =>{
    if (e.currentTarget === e.target) {
      this.props.onClick();
    }
  };

  render() {


    return createPortal(
      <Overlay className="overlay" onClick={this.handleOverlayClick}>
        <ModalContent className="modal" >
          <img src={this.props.children} alt="" />
        </ModalContent >
      </Overlay>,
      modalRoot
    );
  }
};


