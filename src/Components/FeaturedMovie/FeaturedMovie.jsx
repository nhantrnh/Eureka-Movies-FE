import React from 'react'
import useStyles from './FeaturedMovie.style.js'
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material'
import { Link } from 'react-router-dom';


export default function FeaturedMovie({ movie }) {
    const classes = useStyles();

    if (!movie) return null;

    return <>
        <Box component={Link} to={`/Movie/Detail/${movie?.tmdbId}`} className={classes.featuredCardContainer} >
            <Card className={classes.card} classes={{ root: classes.cardRoot }} >
                <CardMedia
                    media='picture'
                    alt={movie?.title}
                    image={`https://image.tmdb.org/t/p/original/${movie?.posterPath}`}
                    title={movie?.title}
                    className={classes.cardMedia}
                />
                <Box padding='20px'>
                    <CardContent className={classes.cardContent} classes={{ root: classes.cardContentRoot }}>
                        <Typography variant='h5' gutterBottom>{movie?.title}</Typography>
                        <Typography variant='body2' gutterBottom>{movie?.overview}</Typography>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    </>
}
