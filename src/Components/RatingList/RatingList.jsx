import React, { useState, useEffect } from 'react';
import useStyles from './RatingList.js';
import { Box, Typography, Link } from '@mui/material';
import { Loader } from '../index.js';
import { Helmet } from 'react-helmet';
import { useFetchWatchList } from '../../api/userAPI.js';
import { Pagination } from '../index.js'

export default function RatingList() {
    const classes = useStyles();

    // State for page numbers
    const [totalPages, setTotalPages] = useState(1); // Keep track of total pages for pagination
    const [page, setPage] = useState(1);

    const { watchList, isFetching3, error3 } = useFetchWatchList(); // Pass page as parameter

    useEffect(() => {
        // Check if the data has total pages, update totalPages
        if (watchList?.totalPages) {
            setTotalPages(watchList.totalPages);
        }
    }, [watchList]); // Whenever the watchlist data updates, update the total pages

    if (isFetching3) {
        return <Loader size="8rem" />;
    }

    if (error3) {
        return <div>An error occurred while fetching the watchlist.</div>;
    }

    return (
        <>
            <Helmet>
                <title>Profile</title>
            </Helmet>

            <Box>

                {!watchList?.length ? (
                    <Typography variant="h5">
                        Add some movies to your watchlist to see them here!
                    </Typography>
                ) : (
                    <Box>
                        {/* Watchlist */}
                        {watchList?.length ? (
                            <Box>
                                <Typography variant="h5">RatingList</Typography>
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

                                <Pagination curruntPage={page} setPage={setPage} totalPages={totalPages} />

                            </Box>
                        ) : null}
                    </Box>
                )}
            </Box>
        </>
    );
}
