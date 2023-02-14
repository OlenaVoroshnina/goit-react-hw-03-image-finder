import axios from 'axios';

export const fetchPhotosByQuery = async (query, page = 1) => {
    const { data } = await axios.get(`https://pixabay.com/api/?q=${query}&page=${page}&key=32802326-1cfc711dbce78707f39704a32&image_type=photo&orientation=horizontal&per_page=12`);
    return data;
  };
  