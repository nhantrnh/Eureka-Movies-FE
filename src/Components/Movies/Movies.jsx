import React, { useState } from 'react'
import useStyles from './Movies.style.js'
import { Box, useMediaQuery, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB.js';
import { FeaturedMovie, Loader, MovieList, Pagination } from './../index.js'


export default function Movies() {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    let maxPerPage = 20;
    const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.curruntGenreOrCategory);
    if (genreIdOrCategoryName === 'TrendingDay') {
        maxPerPage = 10;
    }
    const { generalId } = useSelector((state) => state.curruntGenreOrCategory);

    const { data, error, isLoading, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery, maxPerPage, generalId });

    const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
    const numberOfMovies = lg ? 17 : 19;

    if (isFetching) return <Loader size={'4rem'} />

    if (!data?.data.length) {
        return <>
            <Box display='flex' alignItems='center' mt='20px'>
                <Typography variant='h4'>
                    No movies that match that name.
                    <br />
                    Please search for something else 🎥.
                </Typography>
            </Box>
        </>
    }

    if (error) return <div>An error has occurd.</div>;

    return <>
        <div>
            <FeaturedMovie
                movie={genreIdOrCategoryName === 'LatestTrailers' && data?.data?.length > 0
                    ? {
                        ...data.data[0].movie,
                        trailer: data.data[0].trailer
                    }
                    : data?.data[0]}
            />
            <MovieList movies={genreIdOrCategoryName === 'LatestTrailers' ? data.data.map(item => ({
                ...item.movie,
                trailer: item.trailer
            })) : data.data} numberOfMovies={numberOfMovies} excludeFirst />
            <Pagination curruntPage={page} setPage={setPage} totalPages={data.paging.totalPage} />
        </div>
    </>
}
