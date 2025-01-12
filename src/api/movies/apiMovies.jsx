import axios from 'axios';

const API_URL = process.env.REACT_APP_IMAGE_BASE_LINK;

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTrendingMoviesDay = async (pageNumber, maxPerPage) => {
    return api.get(`${API_URL}/Movie/TrendingDay?PageNumber=${pageNumber}&MaxPerPage=${maxPerPage}`);
  };
  
  export const getTrendingMoviesWeek = async (pageNumber, maxPerPage) => {
    return api.get(`${API_URL}/Movie/TrendingWeek?PageNumber=${pageNumber}&MaxPerPage=${maxPerPage}`);
  }; 

  export const getMoviesPopular = async (pageNumber, maxPerPage) => {
    return api.get(`${API_URL}/Movie/Popular?PageNumber=${pageNumber}&MaxPerPage=${maxPerPage}`);
  };  
  // Example: Get Movie Details
  export const getMovieDetail = async (tmdbId) => {
    return api.get(`${API_URL}/Movie/Detail/${tmdbId}`);
  };
  
  // Example: Add Rating for Movie
  export const addRating = (ratingData) => {
    return api.post(`${API_URL}/Rating/Add`, ratingData);
  };
  