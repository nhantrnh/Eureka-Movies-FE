import React from 'react'
import useStyles from './Movie.style.js'
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material'
import { Link } from 'react-router-dom';
import moviePoster from '../../assests/movie-poster.png'

export default function Movie({ movie, index }) {
    const classes = useStyles();


    return <>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie} >
            <Grow in key={index} timeout={(index + 1) * 200}>
                <Link className={classes.links} to={`Movie/Detail/${movie?.tmdbId}`} >
                    <img alt={movie?.title} className={classes.image}
                        src={movie?.posterPath ? `${process.env.REACT_APP_IMAGE_BASE_LINK}${movie?.posterPath}` : moviePoster} />
                    <Typography className={classes.title} variant='h9'>{movie?.title}</Typography>
                    <Typography className={classes.date} variant='h10'>
                        {movie?.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A'}
                    </Typography>

                </Link>
            </Grow>
        </Grid>
    </>
}
