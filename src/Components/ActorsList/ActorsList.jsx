import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './ActorsList.style.js';
import { useSelector } from 'react-redux';
import { useGetActingListQuery } from '../../services/TMDB.js';
import { Loader, Pagination } from './../index.js';

const ActorsList = () => {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const maxPerPage = 20;
    const { searchQuery } = useSelector((state) => state.currentActor);
    const { actorlistID } = useSelector((state) => state.currentActor);

    const { data, error, isLoading, isFetching } = useGetActingListQuery({ page, searchQuery, maxPerPage, actorlistID });

    if (isFetching) return <Loader size={'4rem'} />;

    if (!data?.data.length) {
        return (
            <Box className={classes.noResults}>
                <Typography variant="h4">
                    No actors found. Please search for something else 🎥.
                </Typography>
            </Box>
        );
    }

    if (error) return <div>An error has occurred.</div>;
    data.data.map((actor) => {                                console.log(actor.id);
    });
    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant="h4">
                Actors List
            </Typography>
            <Grid container className={classes.gridContainer} spacing={3}>
                {data.data.map((actor) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={actor.id}>
                        <Card className={classes.card}>
                            <CardMedia
                                component="img"
                                alt={actor.name}
                                image={`${process.env.REACT_APP_IMAGE_BASE_LINK}/${actor?.profilePath}`}
                                className={classes.cardMedia}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography className={classes.actorName} variant="h6">
                                    {actor.name}
                                </Typography>
                            </CardContent>
                            <Box className={classes.viewButtonContainer}>
                                <Button 
                                    className={classes.viewButton}
                                    variant="contained" 
                                    component={Link} 
                                    to={`/actor/${actor.movieCredits.idNumber}`}
                                >
                                    View Details
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination curruntPage={page} setPage={setPage} totalPages={data.paging.totalPage} />
        </div>
    );
};

export default ActorsList;
