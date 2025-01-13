import React, { useState, useEffect } from 'react';
import useStyles from './FavoriteList.style.js';
import { Box, Button, Typography } from '@mui/material';
import { Loader } from './../index.js';
import { Helmet } from 'react-helmet';
import { useFetchFavoriteList } from '../../api/userAPI.js';
import { useNavigate } from 'react-router-dom';
import { Pagination } from './../index.js';  
export default function FavoriteList() {
    const classes = useStyles();
    const navigate = useNavigate();

    // State for page numbers
    const [favoriteMoviesPage, setFavoriteMoviesPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Keep track of total pages for pagination
    const [page, setPage] = useState(1);

    const { favoriteMovies, isFetching1, error1 } = useFetchFavoriteList(); // Pass page as parameter

    useEffect(() => {
        // Check if the data has total pages, update totalPages
        if (favoriteMovies?.totalPages) {
            setTotalPages(favoriteMovies.totalPages);
        }
    }, [favoriteMovies]); // Whenever the favoriteMovies data updates, update the total pages

    function logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    if (isFetching1) {
        return <Loader size="8rem" />;
    }

    if (error1) {
        return <div>An error occurred while fetching the favoriteMovies.</div>;
    }

    return (
        <>
            <Helmet>
                <title>Favorite Movies</title>
            </Helmet>

            <Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h4" gutterBottom>
                        My Favorite Movies
                    </Typography>
                </Box>

                {!favoriteMovies?.length ? (
                    <Typography variant="h5">
                        Add some movies to your favorite list to see them here!
                    </Typography>
                ) : (
                    <Box>
                        {/* Favorite Movies */}
                        {favoriteMovies?.length ? (
                            <Box>
                                <Typography variant="h5">Favorite Movies</Typography>
                                <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
                                    {favoriteMovies.map((movie) => (
                                        <Box key={movie.movie.tmdbId} display="flex" flexDirection="column" alignItems="center">
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
                                        </Box>
                                    ))}
                                </Box>

                                {/* Pagination */}
                                <Pagination curruntPage={page} setPage={setPage} totalPages={totalPages} />

                            </Box>
                        ) : null}
                    </Box>
                )}
            </Box>
        </>
    );
}
