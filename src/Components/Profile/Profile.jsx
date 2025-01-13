import React, { useState, useEffect } from 'react';
import useStyles from './Profile.style.js';
import { Box, Button, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { Loader, RatedCards } from './../index.js';
import { Helmet } from 'react-helmet';
import { useFetchWatchList } from '../../api/userAPI.js';
import { useFetchFavoriteList } from '../../api/userAPI.js';
import { useFetchRating } from '../../api/userAPI.js';
import { useNavigate, Link } from 'react-router-dom';

export default function Profile() {
    const classes = useStyles();
    const navigate = useNavigate();

    const [favoritePage, setFavoritePage] = useState(1);
    const [watchlistPage, setWatchlistPage] = useState(1);
    const [ratingPage, setRatingPage] = useState(1);

    const { watchList, isFetching3, error3, addToWatches, removeFromWatches } = useFetchWatchList();
    const { favoriteMovies, isFetching1, error1, addToFavorites, removeFromFavorites } = useFetchFavoriteList();
    const { ratings, isFetchingRatings, errorRatings, fetchRatingList } = useFetchRating();


    useEffect(() => {
        fetchRatingList("", "");
    }, []);

    const handleViewAll = (type) => {
        navigate(`/profile/${type}`);
    };

    function logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    if (isFetching3 || isFetching1 || isFetchingRatings) {
        return <Loader size="8rem" />;
    }
    console.log(ratings);
    return (
        <>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h4" gutterBottom>
                        My Profile
                    </Typography>
                </Box>

                {!favoriteMovies?.length && !watchList?.length ? (
                    <Typography variant="h5">
                        Add favorite or watchlist some movies to see them here!
                    </Typography>
                ) : (
                    <Box>
                        {/* Watchlist */}
                        {watchList?.length ? (
                            <Box>
                                <Typography variant="h5">Watchlist</Typography>
                                <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
                                    {watchList.map((movie) => (
                                        <Box key={movie.movie.tmdbId} display="flex" flexDirection="column" alignItems="center">
                                            <Link
                                                key={movie.movie.tmdbId}
                                                to={`/movie/${movie.movie.tmdbId}`}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <img
                                                    src={movie.movie.posterPath ? `${process.env.REACT_APP_IMAGE_BASE_LINK}${movie.movie.posterPath}` : 'default_image_path.jpg'}
                                                    alt={movie.movie.title}
                                                    style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                                                />
                                                <Typography variant="body1" sx={{ mt: 1 }}>
                                                    {movie.movie.title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {new Date(movie.movie.releaseDate).getFullYear()}
                                                </Typography>
                                            </Link>
                                        </Box>
                                    ))}
                                </Box>
                                <Button onClick={() => handleViewAll('watchlist')} color="primary">
                                    See More
                                </Button>
                            </Box>
                        ) : null}

                        {/* Favorite List */}
                        {favoriteMovies?.length ? (
                            <Box>
                                <Typography variant="h5">Favorites List</Typography>
                                <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
                                    {favoriteMovies.map((movie) => (
                                        <Box key={movie.movie.tmdbId} display="flex" flexDirection="column" alignItems="center">
                                            <Link
                                                key={movie.movie.tmdbId}
                                                to={`/movie/${movie.movie.tmdbId}`}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <img
                                                    src={movie.movie.posterPath ? `${process.env.REACT_APP_IMAGE_BASE_LINK}${movie.movie.posterPath}` : 'default_image_path.jpg'}
                                                    alt={movie.movie.title}
                                                    style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                                                />
                                                <Typography variant="body1" sx={{ mt: 1 }}>
                                                    {movie.movie.title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {new Date(movie.movie.releaseDate).getFullYear()}
                                                </Typography></Link>
                                        </Box>
                                    ))}
                                </Box>
                                <Button onClick={() => handleViewAll('favorite')} color="primary">
                                    See More
                                </Button>
                            </Box>
                        ) : null}

                        {/* Rating List */}
                        {ratings?.length ? (
                            <Box>
                                <Typography variant="h5">Rating List</Typography>
                                <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
                                    {ratings.map((movie) => (
                                        <Box key={movie.movie.tmdbId} display="flex" flexDirection="column" alignItems="center">
                                            <Link
                                                key={movie.movie.tmdbId}
                                                to={`/movie/${movie.movie.tmdbId}`}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <img
                                                    src={movie.movie.posterPath ? `${process.env.REACT_APP_IMAGE_BASE_LINK}${movie.movie.posterPath}` : 'default_image_path.jpg'}
                                                    alt={movie.movie.title}
                                                    style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                                                />
                                                <Typography variant="body1" sx={{ mt: 1 }}>
                                                    {movie.movie.title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {new Date(movie.movie.releaseDate).getFullYear()}
                                                </Typography>
                                            </Link>
                                        </Box>
                                    ))}
                                </Box>
                                <Button onClick={() => handleViewAll('ratings')} color="primary">
                                    See More
                                </Button>
                            </Box>
                        ) : null}
                    </Box>
                )}
            </Box>
        </>
    );
}
