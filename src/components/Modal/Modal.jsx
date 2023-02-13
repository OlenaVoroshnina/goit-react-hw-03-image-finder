import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import * as basicLightbox from 'basiclightbox'

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    console.log(Modal);
  }

  render() {


    return createPortal(
      <div className="overlay">
        <div className="modal">
          <img src="" alt="" />
        </div>
      </div>, modalRoot
    );
  }
}


// const instance = basicLightbox.create(`
//     <img src="assets/images/image.png" width="800" height="600">
// `)

// instance.show()
