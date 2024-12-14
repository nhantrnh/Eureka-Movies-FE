import React, { useContext, useEffect, useState } from 'react';
import useStyles from './NavBar.style.js';
import { AppBar, IconButton, Toolbar, useMediaQuery, Drawer, Button, Avatar, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Brightness7, Brightness4, AccountCircle, Menu } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Search, Sidebar } from './../index.js';
import { createSessionId, fetchToken, moviesApi } from '../../utils/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../features/auth.js';
import { ColorModeContext } from './../../utils/ToggoleColorMode';
import avater from './../../assests/avatar-profile.jpg';
import { useGetTrendingMoviesQuery } from '../../services/TMDB.js';  // Importing the query hook

export default function NavBar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [timeRange, setTimeRange] = useState('day'); // default to "Today"
    const classes = useStyles();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(userSelector);
    const token = localStorage.getItem('request_token');
    const sessionIdFromLocalStorage = localStorage.getItem('session_id');

    useEffect(() => {
        const logInUser = async () => {
            if (token) {
                if (sessionIdFromLocalStorage) {
                    const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`)
                    dispatch(setUser(userData));
                } else {
                    const sessionId = await createSessionId();
                    const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`)
                    dispatch(setUser(userData));
                }
            }
        };
        logInUser();
    }, [token]);

    const handleTimeRangeChange = (event, newTimeRange) => {
        if (newTimeRange !== null) {
            setTimeRange(newTimeRange);
        }
    };

    // Use the hook to get trending movies based on the selected time range
    const { data: trendingMovies, isLoading, error } = useGetTrendingMoviesQuery({ timeFilter: timeRange, page: 1 });

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
                    <div>
                        {!isAuthenticated ? (
                            <Button color='inherit' onClick={fetchToken}>
                                Login &nbsp; <AccountCircle />
                            </Button>
                        ) : (
                            <Button
                                color='inherit'
                                component={Link}
                                to={`/profile/${user.id}`}
                                className={classes.linkButtom}
                                onClick={() => { }}
                            >
                                {!isMobile && <>My Movies &nbsp;</>}
                                <Avatar
                                    style={{ width: 30, height: 30 }}
                                    alt='Profile'
                                    src={user?.avater?.tmdb?.avatar_path ? 
                                        `https://www.themoviedb.org/t/p/w64_and_h64_face/${user?.avater?.tmdb?.avatar_path}` : avater}
                                />
                            </Button>
                        )}
                    </div>
                    {isMobile && <Search />}
                                {/* Toggle between Today and This Week */}
            <div style={{ marginTop: 20, textAlign: 'center' }}>
                <ToggleButtonGroup
                    value={timeRange}
                    exclusive
                    onChange={handleTimeRangeChange}
                    aria-label="Trending movies time range"
                >
                    <ToggleButton value="day" aria-label="Trending Today">
                        Today
                    </ToggleButton>
                    <ToggleButton value="week" aria-label="Trending This Week">
                        This Week
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
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
