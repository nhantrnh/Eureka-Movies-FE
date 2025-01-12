import React, { useContext, useState } from 'react';
import useStyles from './NavBar.style.js';
import { AppBar, IconButton, Toolbar, useMediaQuery, Drawer, Button, Avatar, Select, MenuItem } from '@mui/material';
import { Brightness7, Brightness4, AccountCircle, Menu, AccountCircleOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Sidebar } from './../index.js';
import { useDispatch } from 'react-redux';
import { selectGenre } from '../../features/currentGenreOrCategory.js';
import { ColorModeContext } from './../../utils/ToggoleColorMode';
import avater from './../../assests/avatar-profile.jpg';

export default function NavBar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [category, setCategory] = useState('animation'); // Add category state
    const classes = useStyles();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const token = "";

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        let generalId = " ";
        if (selectedCategory === 'animation') {
            generalId = 16;
        } else if (selectedCategory === 'comedy') {
            generalId = 35;
        } else if (selectedCategory === 'science_fiction') {
            generalId = 878;
        }
        dispatch(selectGenre(generalId));
    };

    const handleGoToAdminPage = async () => {
        navigate('/login');
    }

    const handleRegister = async () => {
        navigate('/signup');
    }

    return (
        <>
            <AppBar position='fixed'>
                <Toolbar className={classes.toolbar}>
                    {isMobile && (
                        <IconButton
                            color='inherit'
                            edge='start'
                            style={{ outline: 'none' }}
                            onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                            className={classes.menuButton}
                        >
                            <Menu />
                        </IconButton>
                    )}
                    <IconButton color='inherit' sx={{ ml: 1 }} onClick={colorMode.toggoleColorMode}>
                        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>

                    {!isMobile && <Search />}
                   
                    <Select
                        value={category}
                        onChange={handleCategoryChange}
                        displayEmpty
                        sx={{ color: 'white', ml: 2 }}
                    >
                        <MenuItem value="animation">Animation</MenuItem>
                        <MenuItem value="comedy">Comedy</MenuItem>
                        <MenuItem value="science_fiction">Science Fiction</MenuItem>
                    </Select>

                    <div>
                       (
                            <>
                                <Button color='inherit' onClick={handleGoToAdminPage}>
                                    Login &nbsp; <AccountCircle />
                                </Button>
                                <Button color='inherit' onClick={handleRegister}>
                                    Sign Up &nbsp; <AccountCircleOutlined />
                                </Button>
                            </>
                        ) 
                    </div>
                    {isMobile && <Search />}
                </Toolbar>
            </AppBar>

            <div>
                <nav className={classes.drawer}>
                    {isMobile ? (
                        <Drawer
                            variant='temporary'
                            anchor='right'
                            open={mobileOpen}
                            onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                            classes={{ paper: classes.drawerPaper }}
                            ModalProps={{ keepMounted: true }}
                        >
                            <Sidebar setMobileOpen={setMobileOpen} />
                        </Drawer>
                    ) : (
                        <Drawer classes={{ paper: classes.drawerPaper }} variant='permanent' open>
                            <Sidebar setMobileOpen={setMobileOpen} />
                        </Drawer>
                    )}
                </nav>
            </div>
        </>
    );
}
