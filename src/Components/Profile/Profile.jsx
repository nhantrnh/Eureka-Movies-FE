import React, { useState, useEffect, useMemo  } from 'react';
import useStyles from './Profile.style.js';
import { Box, Button, Typography } from '@mui/material';
import { Loader, RatedCards } from './../index.js';
import { Helmet } from 'react-helmet';
import { useFetchWatchList } from '../../api/userAPI.js';
import { useFetchFavoriteList, useFetchMovieRecommendations } from '../../api/userAPI.js';
import { useFetchRating } from '../../api/userAPI.js';
import { useNavigate, Link } from 'react-router-dom';

export default function Profile() {
    const classes = useStyles();
    const navigate = useNavigate();

    const { watchList, isFetching3 } = useFetchWatchList();
    const { favoriteMovies, isFetching1 } = useFetchFavoriteList();
    const { ratings, isFetchingRatings, fetchRatingList } = useFetchRating();

    const displayText = watchList?.map((item) => {
        const overview = item.movie?.overview;
        // If 'overview' exists, use its first 300 characters; otherwise, use the movie's title
        return overview ? overview.substring(0, 500) : item.movie?.title;
    }).join(',') || '';
    const { recommendations } = useFetchMovieRecommendations(displayText); // Sử dụng custom hook
    const filteredRecommendations = useMemo(() => {
        if (!recommendations || !watchList) return [];
        
        const watchListIds = new Set(watchList.map(item => item.movie.id));
        
        return recommendations.filter(rec => !watchListIds.has(rec.id));
    }, [recommendations, watchList]);

    useEffect(() => {
        fetchRatingList("", "");
    }, []);

    const handleViewAll = (type) => {
        navigate(`/profile/${type}`);
    };

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

                {!favoriteMovies?.length && !watchList?.length && !ratings?.length && filteredRecommendations?.length ? (
                    <Typography variant="h5">
                        Add favorite or watchlist some movies to see them here!
                    </Typography>
                ) : (
                    <Box>
                          {/* Recommendations */}
                          {filteredRecommendations?.length ? (
                             <Box>
                             <Typography variant="h5">Recommendations Base On Your History</Typography>
                             <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
                                 {filteredRecommendations.map((movie) => (
                                     <Box key={movie.tmdbId} display="flex" flexDirection="column" alignItems="center">
                                         <Link
                                             key={movie.tmdbId}
                                             to={`/movie/${movie.tmdbId}`}
                                             style={{ textDecoration: 'none' }}
                                         >
                                             <img
                                                 src={movie.posterPath ? `${process.env.REACT_APP_IMAGE_BASE_LINK}${movie.posterPath}` : 'default_image_path.jpg'}
                                                 alt={movie.title}
                                                 style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                                             />
                                             <Typography variant="body1" sx={{ mt: 1 }}>
                                                 {movie.title}
                                             </Typography>
                                             <Typography variant="body2" color="textSecondary">
                                                 {new Date(movie.releaseDate).getFullYear()}
                                             </Typography>
                                         </Link>
                                     </Box>
                                 ))}
                             </Box>
                             <Button onClick={() => handleViewAll('recommendations')} color="primary" style={{ marginLeft: '1rem' }}>
                                 See More
                             </Button>
                         </Box>
                        ) : null}

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
                                <Button onClick={() => handleViewAll('ratings')} color="primary" style={{ marginLeft: '1rem' }}>
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
