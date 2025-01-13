import React, { useState } from 'react'
import useStyles from './Search.style.js'
import { TextField, InputAdornment } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { searchMovie } from '../../features/currentGenreOrCategory.js'
import { searchActor } from '../../features/actor.js'

export default function Search() {
    const classes = useStyles();
    const location = useLocation(); 

    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (location.pathname === '/actors') {
                dispatch(searchActor(query));
            } else {
                dispatch(searchMovie(query));
                navigate('/');
            }
        }
    }

    return <>
        <div className={classes.searchContainer}>
            <TextField 

                onKeyPress={handleKeyPress} 
                value={query} 
                onChange={(e)=> setQuery(e.target.value)} 
                variant='standard' 
                InputProps={{
                    style: { maxWidth: '500px', },
                    className: classes.input,
                    startAdornment: (
                        <InputAdornment position='start' >
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    </>
}
