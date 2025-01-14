import React, { useEffect, useState } from 'react'
import useStyles from './MovieInformation.style.js'
import { Modal, Typography, Button, ButtonGroup, Grid, Box, Rating, IconButton } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack, Close, Close as CloseIcon, DesignServicesOutlined, Dns, } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../utils/axios';
import { Loader, NotFound, MovieList } from './../index.js'
import moviePoster from './../../assests/movie-poster.png'
import genreIcons from './../../assests/genres/index.js'
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory.js';
import { useFetchFavoriteList, useFetchWatchList, useFetchMovieRecommendations } from '../../api/userAPI.js';
import { isRejected } from '@reduxjs/toolkit';

export default function MovieInformation() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [isIframeLoading, setIsIframeLoading] = useState(false);
    const [playMovie, setPlayMovie] = useState(false);
    const [movieServer, setMovieServer] = useState(1);
    const [isMovieFavorited, setIsMovieFavorited] = useState(false);
    const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);
    const { tmdbId } = useParams();
    let rcm = '';
    const { favoriteMovies, isFetching1, error1, addToFavorites, removeFromFavorites } = useFetchFavoriteList(); // Sử dụng custom hook
    const { watchList, isFetching2, error3, addToWatches, removeFromWatches } = useFetchWatchList(); // Sử dụng custom hook
    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const [ratingModalOpen, setRatingModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [isRated, setIsRated] = useState(false);
    let favoriteId = "";
    let watchListId = "";
    const handleRatingSubmit = async (tmdbId) => {
        try {
            await axiosInstance.post('/Rating/Add', {
                stars: rating,
                comment: "",
                tmdbId: tmdbId,
            });
            setRatingModalOpen(false);
        } catch (error) {
            console.error("Error submitting rating:", error);
        }
    };

    const fetchData = async () => {
        setIsFetching(true);
        try {
            const response = await axiosInstance.get(`Movie/Detail/${tmdbId}`);
            console.log('Response Data:', response.data.data);
            if (response.data) {
                setData(response.data.data.movie);
                setRating(response.data.data?.rating);
                if (response.data.data?.rating > 0) {
                    setIsRated(true);
                }
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
        console.log('tmdbId changed:', tmdbId);
        fetchData();
    }, [tmdbId]);

    const displayText = data?.overview 
    ? data.overview.substring(0, 3000) 
    : data?.title;

    const { recommendations, isFetching4, error4 } = useFetchMovieRecommendations(displayText); // Sử dụng custom hook
    console.log(recommendations);
    function formatDate(inputDate) {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const [year, month, day] = inputDate.split('T')[0].split('-').map(Number);

        const formattedDate = `${day} ${months[month - 1]} ${year}`;

        return formattedDate;
    }
    const [showAll, setShowAll] = useState(false);

    const handleShowMore = () => {
        setShowAll(!showAll);
    };

    const displayedCast = showAll ? data?.credits?.cast : data?.credits?.cast?.slice(0, 6);

    useEffect(() => {
        setIsMovieFavorited(!!favoriteMovies?.find(item => item.tmdbId === data?.tmdbId));
    }, [favoriteMovies, data]);

    useEffect(() => {
        setIsMovieWatchlisted(!!watchList?.find(item => item.tmdbId === data?.tmdbId));
    }, [watchList, data]);
   // console.log(isMovieFavorited)
   // console.log(isMovieWatchlisted)
    const handleAddToFavorites = async (movie) => {
        try {
            await axiosInstance.post('/Favorite/Add', { tmdbId: movie.tmdbId });
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
        //console.log( movie.tmdbId );
        addToFavorites();
        setIsMovieFavorited((prev) => !prev);
       // console.log(isMovieFavorited)
    };


    const handleAddToWatchlist = async (movie) => {
        try {
            await axiosInstance.post('/WatchList/Add', { tmdbId: movie.tmdbId });
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
        setIsMovieWatchlisted((prev) => !prev);
        addToWatches();
        // console.log(isMovieWatchlisted)

    };


    const handleRemoveFromFavorites = async (targetTmdbId) => {
        try {
            favoriteId = favoriteMovies?.find(item => item.tmdbId === targetTmdbId)?.favoriteId;
            await axiosInstance.delete(`/Favorite/Remove/${favoriteId}`);
            removeFromFavorites(targetTmdbId);
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
        setIsMovieFavorited((prev) => !prev);
    };
    const handleRemoveFromWatchlist = async (targetTmdbId) => {
        try {
            watchListId = watchList?.find(item => item.tmdbId === targetTmdbId)?.watchListId;
            await axiosInstance.delete(`/WatchList/Remove/${watchListId}`);
            removeFromWatches(targetTmdbId);
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
        setIsMovieWatchlisted((prev) => !prev);
    };

    if (isFetching) return <Loader size='8rem' />

    if (error) return <NotFound message='Something has gone wrong - Go back' path='/' />

    return <>
        {/* <Helmet>
            <title>Film: {data?.title}</title>
        </Helmet> */}
        <Grid container className={classes.containerSpaceAround} >
            <Grid item sm={12} lg={4} className={classes.posterContainer}> {/* Image Grid */}
                <img
                    className={classes.poster}
                    src={data?.posterPath ? `${process.env.REACT_APP_IMAGE_BASE_LINK}${data?.posterPath}` : moviePoster}
                    alt={data?.title}
                />
            </Grid>
            <Grid item container direction='column' lg={7} > {/* Film Data Grid */}
                <Typography variant='h3' align='center' gutterBottom>
                    {data?.title} ({data?.releaseDate?.split('-')[0]})
                </Typography>
                <Typography variant='h5' align='center' gutterBottom>
                    {data?.tagline}
                </Typography>
                <Grid item className={classes.containerSpaceAround}> {/* Rating & Languages Grid */}
                    <Box display='flex' align='center' >
                        <Rating readOnly value={data?.voteAverage / 2} precision={0.1} />
                        <Typography variant='subtitle1' gutterBottom style={{ marginLeft: '10px' }}>{data?.voteAverage} / 10</Typography>

                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setRatingModalOpen(true)}
                    >
                        Your Rate
                    </Button>
                    <Typography variant='h6' align='center' gutterBottom>
                        {data?.runtime}min / {(data?.releaseDate.split('-')[0])} {data?.spoken_languages?.length > 0 ? ` / ${data?.spoken_languages[0]?.name}` : ''}
                    </Typography>


                    {/* Rating Modal */}
                    <Modal
                        open={ratingModalOpen}
                        onClose={() => setRatingModalOpen(false)}
                        className={classes.modal1}
                    >
                        <div className={classes.modalContent}>
                            <Typography variant="h6" gutterBottom>
                                Rate {data?.title}
                            </Typography>

                            <Rating
                                value={rating}
                                onChange={(event, newValue) => setRating(newValue)}
                                max={10}
                            />

                            {/* Bottom Buttons Container */}
                            <Box className={classes.bottomButtonContainer}>
                                {/* Close Button */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setRatingModalOpen(false)}
                                    className={classes.closeButton}
                                >
                                    Close
                                </Button>

                                {/* Submit Button */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>handleRatingSubmit(data?.tmdbId)}
                                    className={classes.submitButton}
                                    disabled={rating === 0 || isRated}
                                >
                                    Rate
                                </Button>
                            </Box>

                        </div>
                    </Modal>

                </Grid>

                <Grid item className={classes.genresContainer}> {/* Genres Grid */}
                    {data?.genres?.map((genre, index) => (
                        <Link
                            key={index}
                            className={classes.links}
                            to={`/`}
                            onClick={() => dispatch(selectGenreOrCategory(genre?.id))}
                        >
                            <img src={genreIcons[genre?.name?.toLowerCase()]} alt="icon" className={classes.genereImage} height={30} />
                            <Typography color='textPrimary' variant='subtitle1'>{genre?.name}</Typography>
                        </Link>
                    ))}
                </Grid>
                <Typography variant='h5' gutterBottom style={{ marginTop: '10px' }}> Overview </Typography>
                <Typography style={{ marginBottom: '2rem' }}> {data?.overview} </Typography>
                <Typography variant="h5" gutterBottom>
                    Top Cast
                </Typography>
                <Grid item container spacing={2}> {/* Cast Data Grid */}
                    {displayedCast?.map((character, index) =>
                        character?.profilePath && (
                            <Grid
                                key={index}
                                item
                                xs={4} md={2}
                                component={Link}
                                to={`/actor/${character?.idNumber}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <img
                                    className={classes.castImage}
                                    src={`${process.env.REACT_APP_IMAGE_BASE_LINK}/${character?.profilePath}`}
                                    alt={character?.name}
                                />
                                <Typography color="textPrimary">{character?.name}</Typography>
                                <Typography color="textSecondary">{character?.character?.split('/')[0]}</Typography>
                            </Grid>
                        )
                    )}
                </Grid>
                {data?.credits?.cast?.length > 6 && (
                        <Button  component={Link}
                        to={`/movie/${tmdbId}/casts`}
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '10px' }}>
                            See All Casts
                        </Button>
                    )}
                <Grid item container style={{ marginTop: '2rem' }}> {/* Buttons Grid */}
                    <div className={classes.buttonsContainer}>
                        <Grid item className={classes.buttonsContainer} style={{ marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
                            <ButtonGroup size='medium' variant='outlined'>
                                <Button
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    href={data?.homepage ? data?.homepage : '#'}
                                    endIcon={<Language />}
                                > Website </Button>
                                <Button
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    href={`https://www.imdb.com/title/${data?.imdbId}`}
                                    endIcon={<Language />}
                                > IMDB </Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item className={classes.buttonsContainer} style={{ marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
                            <ButtonGroup size='medium' variant='outlined'>
                                <Button
                                    onClick={() => setOpen(true)} // open trailer videoa
                                    href=''
                                    endIcon={<Theaters />}
                                    disabled={data?.trailers?.length > 0 ? false : true}
                                > Trailer </Button>
                                <Button
                                    onClick={() => {
                                        setPlayMovie(true);
                                        setMovieServer(1);
                                        setIsIframeLoading(true);
                                    }}
                                    endIcon={<MovieIcon />}
                                > Watch
                                </Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item className={classes.buttonsContainer} style={{ marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
                            <ButtonGroup size='medium' variant='outlined'>
                                <Button
                                    onClick={() => {
                                        if (isMovieFavorited) {
                                            handleRemoveFromFavorites(data.tmdbId);
                                        } else {
                                            handleAddToFavorites(data);
                                        }
                                    }}
                                    endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}
                                > {isMovieFavorited ? 'Unfavorite' : 'Favorite'} </Button>
                                <Button
                                    onClick={() => {
                                        if (isMovieWatchlisted) {
                                            handleRemoveFromWatchlist(data.tmdbId);
                                        } else {
                                            handleAddToWatchlist(data);
                                        }
                                    }}
                                    endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                                > WatchList </Button>
                            </ButtonGroup>
                        </Grid>
                    </div>
                </Grid>
            </Grid>


           
             {recommendations?.length > 0 ? <Box marginTop='5rem' width='100%'>
                <Typography variant='h3' gutterBottom align='center'>You might also like</Typography>
                <MovieList movies={recommendations} numberOfMovies={12} />
            </Box> : null}


            {/* Modal Movie */}
            {playMovie && <Modal
                closeAfterTransition
                className={classes.modal}
                open={playMovie}
                disableBackdropClick
            >
                <div className={classes.movieModelDiv} >
                    <Grid item className={classes.buttonsContainer} style={{ justifyContent: 'space-between' }}>
                        <ButtonGroup size='small' variant='contained' >
                            <Button
                                onClick={() => {
                                    if (movieServer == 2) {
                                        setMovieServer(1);
                                        setIsIframeLoading(true);
                                    }
                                }}
                                endIcon={<Dns />}
                            > Server 1 </Button>
                            <Button
                                onClick={() => {
                                    if (movieServer == 1) {
                                        setMovieServer(2);
                                        setIsIframeLoading(true);
                                    }
                                }}
                                endIcon={<Dns />}
                            > Server 2 </Button>
                        </ButtonGroup>
                        <ButtonGroup size='small' variant='contained' >
                            <Button
                                onClick={() => setPlayMovie(false)}
                                endIcon={<Close />}
                            > Close </Button>
                        </ButtonGroup>
                    </Grid>
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                        {isIframeLoading && <div className={classes.movieLoader} >
                            <Loader size='4rem' />
                        </div>}
                        <iframe
                            autoPlay
                            frameBorder='0'
                            title='Movie'
                            src={movieServer === 1 ? `https://vidsrc.xyz/embed/movie/${tmdbId}` : `https://www.2embed.cc/embed/${tmdbId}`}
                            allow='autoplay'
                            allowFullScreen
                            scrolling="no"
                            width="100%"
                            height="100%"
                            onLoad={() => setIsIframeLoading(false)}
                            style={{ backgroundColor: "black" }}
                        />
                    </div>
                </div>
            </Modal>}


            {/* Modal Trailer Youtube Video */}
            {data?.trailers?.length > 0 && <Modal
                closeAfterTransition
                className={classes.modal}
                open={open}
                onClose={() => setOpen(false)}
            >
                <iframe
                    autoPlay
                    className={classes.videos}
                    frameBorder='0'
                    title='Trailer'
                    src={`https://www.youtube.com/embed/${data?.trailers[0]?.key}`}
                    allow='autoplay'
                />
            </Modal>}
        </Grid>
    </>
}
