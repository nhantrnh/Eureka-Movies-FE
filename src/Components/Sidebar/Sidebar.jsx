import React, { useEffect } from 'react'
import useStyles from './Sidebar.style.js'
import { Divider, List, ListItem, ListItemIcon, ListSubheader, ListItemText } from '@mui/material'
import { useTheme } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useGetGenresQuery } from '../../services/TMDB.js';
import { Footer, Loader } from './../index.js'
import genreIcons from './../../assests/genres/index.js'
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory.js';
import logo from './../../assests/logo.png';

const categories = [
    { label: 'Home', value: 'Home', icon: 'adventure' },
    { label: 'Popular', value: 'Popular', icon: 'popular' },
    { label: 'Trending Day', value: 'TrendingDay', icon: 'documentary' },
    { label: 'Trending Week', value: 'TrendingWeek', icon: 'history' },
    { label: 'Lasted Trailers', value: 'LatestTrailers', icon: 'tv movie' },
];

export default function Sidebar({ setMobileOpen }) {
    const classes = useStyles();
    const theme = useTheme();

    const { genreIdOrCategoryName } = useSelector((state) => state.curruntGenreOrCategory);
    const dispatch = useDispatch();


    useEffect(() => {
        setMobileOpen(false);
    }, [genreIdOrCategoryName]);


    return <>
        <Link to={`/`} className={classes.imageLink}>
            <img
                className={classes.image}
                src={logo}
                alt="Eureka Movies"
               />
        </Link>
        <Divider />
        <List>
            <ListSubheader>
                Categories
            </ListSubheader>
            {categories.map(({ label, value, icon }) => (
                <Link key={value} className={classes.links} to={`/`} >
                    <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
                        <ListItemIcon>
                            <img src={genreIcons[icon.toLowerCase()]} alt="icon" className={classes.genereImages} height={30} />
                        </ListItemIcon>
                        <ListItemText primary={label} />
                    </ListItem>
                </Link>
            ))}
        </List>
        <Divider />
        <Divider />
        <Footer />

    </>
}
