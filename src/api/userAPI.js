import axiosInstance from '../utils/axios';
import { useState, useEffect } from 'react';

export const fetchMovieData = async (tmdbId) => {
  try {
    const response = await axiosInstance.get(`Movie/Detail/${tmdbId}`);
    return response.data.data.movie;
  } catch (error) {
    throw error;
  }
};

export const useFetchWatchList = () => {
  const [watchList, setWatchList] = useState(null);
  const [isFetching3, setIsFetching] = useState(false);
  const [error3, setError] = useState(null);

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const response = await axiosInstance.get(`/WatchList/GetWatchList`);
      if (response.data) {
        setWatchList(response.data.data);
      } else {
        console.error('No data returned from API.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();

  }, []);

  const addToWatches = async () => {
    const response = await axiosInstance.get(`/WatchList/GetWatchList`);
    if (response.data) {
      setWatchList(response.data.data);
    } else {
      console.error('No data returned from API.');
    }
  };

  const removeFromWatches = (tmdbId) => {
    setWatchList((prevFavorites) =>
      prevFavorites.filter(movie => movie.tmdbId !== tmdbId)
    );
  };
  return { watchList, isFetching3, error3, addToWatches, removeFromWatches };

};

export const useFetchFavoriteList = () => {
  const [favoriteMovies, setFavoriteMovies] = useState(null);
  const [isFetching1, setIsFetching1] = useState(false);
  const [error1, setError1] = useState(null);

  const fetchData = async () => {
    setIsFetching1(true);
    try {
      const response = await axiosInstance.get(`/Favorite/GetFavoriteList`);
      if (response.data) {
        setFavoriteMovies(response.data.data);
      } else {
        console.error('No data returned from API.');
      }
    } catch (error1) {
      console.error('Error:', error1);
      setError1(error1);
    } finally {
      setIsFetching1(false);
    }
  };

  useEffect(() => {
    fetchData();

  }, []);

  const addToFavorites = async () => {
    const response = await axiosInstance.get(`/Favorite/GetFavoriteList`);
    if (response.data) {
      setFavoriteMovies(response.data.data);
    } else {
      console.error('No data returned from API.');
    }
  };

  // Hàm để xóa phim khỏi danh sách yêu thích
  const removeFromFavorites = (tmdbId) => {
    setFavoriteMovies((prevFavorites) =>
      prevFavorites.filter(movie => movie.tmdbId !== tmdbId)
    );
  };

  return { favoriteMovies, isFetching1, error1, addToFavorites, removeFromFavorites };

};

export const useFetchRating = () => {
  const [ratings, setRatings] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [isFetchingRatings, setIsFetchingRatings] = useState(false);
  const [isFetchingReviews, setIsFetchingReviews] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Rating List
  const fetchRatingList = async (pageNumber = "", maxPerPage = "") => {
    setIsFetchingRatings(true);
    try {
      const response = await axiosInstance.get('/Rating/GetRatingList', {
        data: { PageNumber: pageNumber, MaxPerPage: maxPerPage }
      });
      if (response.data) {
        setRatings(response.data); // set data to ratings
      } else {
        console.error('No data returned from API.');
      }
    } catch (error) {
      console.error('Error fetching rating list:', error);
      setError(error);
    } finally {
      setIsFetchingRatings(false);
    }
  };

  // Fetch Reviews for a specific movie by tmdbId
  const fetchReviews = async (tmdbId, pageNumber = 1, maxPerPage = 10) => {
    setIsFetchingReviews(true);
    try {
      const response = await axiosInstance.get('/Rating/GetReviews', {
        params: { TmdbId: tmdbId, PageNumber: pageNumber, MaxPerPage: maxPerPage }
      });
      if (response.data) {
        setReviews(response.data); // set data to reviews
      } else {
        console.error('No reviews data returned from API.');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError(error);
    } finally {
      setIsFetchingReviews(false);
    }
  };

  // Add a new rating
  const addRating = async (stars, comment, tmdbId) => {
    try {
      const response = await axiosInstance.post('/Rating/Add', {
        stars,
        comment,
        tmdbId
      });
      if (response.data) {
        console.log('Rating added successfully');
      }
    } catch (error) {
      console.error('Error adding rating:', error);
      setError(error);
    }
  };

  // Edit an existing rating
  const editRating = async (ratingId, stars, comment) => {
    try {
      const response = await axiosInstance.put('/Rating/Edit', {
        ratingId,
        stars,
        comment
      });
      if (response.data) {
        console.log('Rating edited successfully');
      }
    } catch (error) {
      console.error('Error editing rating:', error);
      setError(error);
    }
  };

  // Delete a rating by ratingId
  const deleteRating = async (ratingId) => {
    try {
      const response = await axiosInstance.delete(`/Rating/Delete/${ratingId}`);
      if (response.data) {
        console.log('Rating deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting rating:', error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchRatingList(); 
  }, []);

  return {
    ratings,
    reviews,
    isFetchingRatings,
    isFetchingReviews,
    error,
    fetchRatingList,
    fetchReviews,
    addRating,
    editRating,
    deleteRating
  };
};
