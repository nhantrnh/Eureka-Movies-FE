import React, { useState, useEffect } from 'react';
import useStyles from './ActorsMovieList.style.js';
import { Box, Button, Typography } from '@mui/material';
import { Loader } from './../index.js';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Pagination } from './../index.js';
import moviePoster from './../../assests/movie-poster.png'
import axiosInstance from '../../utils/axios';

export default function ActorsMovieList() {
    const classes = useStyles();
    const { tmdbId } = useParams();
    // State for page numbers
    const [dataPage, setdataPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Keep track of total pages for pagination
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const [page, setPage] = useState(1);


    function logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    const fetchData = async () => {
        setIsFetching(true);
        try {
            const response = await axiosInstance.get(`Movie/Detail/${tmdbId}`);
            console.log('Response Data:', response.data.data);
            if (response.data) {
                setData(response.data.data.movie.credits.cast);
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
    console.log(data);

    useEffect(() => {
        fetchData();
    }, []);


    if (isFetching) {
        return <Loader size="8rem" />;
    }

    if (error) {
        return <div>An error occurred while fetching the data.</div>;
    }

    return (
        <>
            <Helmet>
                <title>Casts in Movie</title>
            </Helmet>

            <Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h4" gutterBottom>
                        My Favorite Movies
                    </Typography>
                </Box>

                {!data?.length ? (
                    <Typography variant="h5">
                        Nothing here!
                    </Typography>
                ) : (
                    <Box>
                        {/* Favorite Movies */}
                        {data?.length ? (
                            <Box>
                                <Typography variant="h5">Favorite Movies</Typography>
                                <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2} >
                                    {data.map((actor) => (
                                        <Box key={actor.tmdbId} display="flex" flexDirection="column" alignItems="center">
                                            <Link
                                                key={actor.id}
                                                to={`/actor/${actor.idNumber}`}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <img
                                                    src={actor.profilePath ? `${process.env.REACT_APP_IMAGE_BASE_LINK}${actor.profilePath}` : moviePoster}
                                                    alt={actor.name}
                                                    style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                                                />
                                                <Typography variant="body1" sx={{ mt: 1 }}>
                                                    {actor.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {actor.character}
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
