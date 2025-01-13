import React, { useEffect, useState } from 'react'
import useStyles from './Profile.style.js'
import { userSelector } from '../../features/auth.js';
import { Box, Button, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { Loader, RatedCards } from './../index.js'
import { Helmet } from 'react-helmet';
import { useGetListQuery, useGetMovieQuery, useGetRecommendationsQuery, useGetFavoriteMoviesQuery, useGetWatchListQuery } from '../../services/TMDB.js';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { useFetchFavoriteList, useFetchWatchList } from '../../api/userAPI.js';

export default function Profile() {
    const classes = useStyles();
    
    const [favoritePage, setFavoritePage] = useState(1);
    const [watchlistPage, setWatchlistPage] = useState(1);
       
    
  const { favoriteMovies, isFetching1, error1 } = useFetchFavoriteList(); // Sử dụng custom hook
  const { watchlistMovies, isFetching2, error3 } = useFetchWatchList(); // Sử dụng custom hook

  console.log(favoriteMovies);
   console.log(watchlistMovies);

  
    function logout() {
        localStorage.clear();
        window.location.href = '/';
    }

   // if(isFetchingFavoriteMovies || isFetchingWatchlistMovies) return <Loader size='8rem' />

    return <>
        <Helmet>
            <title>Profile</title>
        </Helmet>
        <Box>
            <Box display='flex' justifyContent='space-between' >
                <Typography variant='h4' gutterBottom>My Profie</Typography>
                <Button color='inherit' onClick={logout}>
                    Logout &nbsp; <ExitToApp />
                </Button>
            </Box>

            {!favoriteMovies?.total_results && !watchlistMovies?.total_results ? 
                <Typography variant='h5' >Add favorite or watchlist some movies to see them here!</Typography>
                : 
                <Box>
                    {favoriteMovies?.total_results? <RatedCards 
                        title='Favorite Movies' 
                        data={favoriteMovies} 
                        page={favoritePage} 
                        setPage={setFavoritePage}
                    /> : ''}
                    {watchlistMovies?.total_results? <RatedCards 
                        title='Watchlist' 
                        data={watchlistMovies}
                        page={watchlistPage} 
                        setPage={setWatchlistPage}
                    /> : ''}
                </Box> 
            }
        </Box>
    </>
}