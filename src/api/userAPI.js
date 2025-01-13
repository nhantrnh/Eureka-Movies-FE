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
  const [isFetching1, setIsFetching] = useState(false);
  const [error1, setError] = useState(null);

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const response = await axiosInstance.get(`/Favorite/GetFavoriteList`);
      if (response.data) {
        setFavoriteMovies(response.data.data);
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
