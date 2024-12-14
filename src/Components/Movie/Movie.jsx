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
                <Link className={classes.links} to={`/movie/${movie?.id}`} >
                    <img alt={movie?.title} className={classes.image}
                        src={movie?.poster_path ? `${process.env.REACT_APP_IMAGE_BASE_LINK}${movie?.poster_path}` : moviePoster} />
                    <Typography className={classes.title} variant='h6'>{movie?.title}</Typography>
                    <Typography className={classes.date} variant='h7'>
                        {movie?.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                    </Typography>

                </Link>
            </Grow>
        </Grid>
    </>
}
