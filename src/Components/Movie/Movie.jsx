import React from 'react'
import useStyles from './Movie.style.js'
import { Typography, Grid, Grow } from '@mui/material'
import { Link } from 'react-router-dom';
import moviePoster from '../../assests/movie-poster.png'

export default function Movie({ movie, index }) {
    const classes = useStyles();
    
    const posterPath = movie?.posterPath || movie?.poster_path;
    const releaseDate = movie?.releaseDate || movie?.release_date;
    let id = movie?.tmdbId;
    if (!movie?.tmdbId) {
        id = movie?.id;
    }
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie} >
            <Grow in key={index} timeout={(index + 1) * 200}>
                <Link className={classes.links} to={`/movie/${id}`} >
                    <img 
                        alt={movie?.title || 'Movie Poster'} 
                        className={classes.image} 
                        src={posterPath ? `${process.env.REACT_APP_IMAGE_BASE_LINK}${posterPath}` : moviePoster} 
                    />
                    <Typography className={classes.title} variant='h9'>{movie?.title}</Typography>
                    <Typography className={classes.date} variant='h10'>
                        {releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'}
                    </Typography>
                </Link>
            </Grow>
        </Grid>
    );
}
