import axios from 'axios';
import PropTypes from 'prop-types';

export const fetchPhotosByQuery = async (query, page = 1) => {
    const { data } = await axios.get(`https://pixabay.com/api/?q=${query}&page=${page}&key=32802326-1cfc711dbce78707f39704a32&image_type=photo&orientation=horizontal&per_page=12`);
    return data;
  };
  
  fetchPhotosByQuery.propTypes = {
    page: PropTypes.number.isRequired,
    query: PropTypes.string.isRequired,
  };