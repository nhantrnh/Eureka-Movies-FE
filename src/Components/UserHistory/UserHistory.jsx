import React, { useState, useEffect, useMemo } from 'react';
import { Box, Link, Typography } from '@mui/material';
import { Loader } from './../index.js';
import { Helmet } from 'react-helmet';
import { useFetchWatchList, useFetchMovieRecommendations, } from '../../api/userAPI.js';
import { Pagination } from './../index.js'

export default function UserHistory() {
    // State for page numbers
    const [totalPages, setTotalPages] = useState(1); // Keep track of total pages for pagination
    const [page, setPage] = useState(1);

    const { watchList, isFetching3, error3 } = useFetchWatchList();

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
        // Check if the data has total pages, update totalPages
        if (filteredRecommendations?.totalPages) {
            setTotalPages(watchList.totalPages);
        }
    }, [filteredRecommendations]); // Whenever the watchlist data updates, update the total pages

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
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h4" gutterBottom>
                        My Profile
                    </Typography>
                </Box>

                {!watchList?.length ? (
                    <Typography variant="h5">
                        Add some movies to your watchlist to see them here!
                    </Typography>
                ) : (
                    <Box>
                        {/* Watchlist */}
                        {watchList?.length ? (
                            <Box>
                                <Typography variant="h5">Recommendations</Typography>
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

                                <Pagination curruntPage={page} setPage={setPage} totalPages={totalPages} />

                            </Box>
                        ) : null}
                    </Box>
                )}
            </Box>
        </>
    );
}
