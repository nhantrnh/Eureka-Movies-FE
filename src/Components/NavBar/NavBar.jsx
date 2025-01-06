import React, { useContext, useEffect, useState } from 'react';
import useStyles from './NavBar.style.js';
import { AppBar, IconButton, Toolbar, useMediaQuery, Drawer, Button, Avatar, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Brightness7, Brightness4, AccountCircle, Menu, AccountCircleOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Sidebar } from './../index.js';
import { createSessionId, fetchToken, moviesApi } from '../../utils/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../features/auth.js';
import { ColorModeContext } from './../../utils/ToggoleColorMode';
import avater from './../../assests/avatar-profile.jpg';
import { useGetTrendingMoviesQuery } from '../../services/TMDB.js';  // Importing the query hook
import { toast } from 'react-toastify';
import UserServices from '../../services/user.s'; // Importing UserServices

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
    const navigate = useNavigate();

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
    const handleGoToAdminPage = async () => {
        /*try {
        const response = await UserServices.fetchListUsers();
        if (response.statusCode === 200) {
        console.log('List users:', response.data);
        navigate(`/profile/${user.id}`);
        }
        else if (response.statusCode === 401) {
        toast.error(response.message);
        navigate('/login');
        }
        else {
        toast.error(response.message);
        }
        }
        catch (error) {
        console.log('Error:', error);
        toast.error(error);
        navigate('/login');
        }*/
        navigate('/login');
    }

    const handleRegister = async () => {
        navigate('/signup');
    }

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
                                        {/* Toggle between Today and This Week */}
                    <div style={{textAlign: 'center', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                        <ToggleButtonGroup
                            value={timeRange}
                            exclusive
                            onChange={handleTimeRangeChange}
                            aria-label="Trending movies time range"
                            color="primary" // Set primary color
                        >
                            <ToggleButton
                                value="day"
                                aria-label="Trending Today"
                                style={{
                                    color: timeRange === 'day' ? '#ffffff' : '#000000', // Text color
                                    backgroundColor: timeRange === 'day' ? '#3f51b5' : '#f0f0f0', // Background color
                                }}
                            >
                                Today
                            </ToggleButton>
                            <ToggleButton
                                value="week"
                                aria-label="Trending This Week"
                                style={{
                                    color: timeRange === 'week' ? '#ffffff' : '#000000', // Text color
                                    backgroundColor: timeRange === 'week' ? '#3f51b5' : '#f0f0f0', // Background color
                                }}
                            >
                                This Week
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div>
                        {!isAuthenticated ? (
                            <>
                                <Button color='inherit' onClick={handleGoToAdminPage}>
                                    Login &nbsp; <AccountCircle />
                                </Button>
                                <Button color='inherit' onClick={handleRegister}>
                                    Sign Up &nbsp; <AccountCircleOutlined />
                                </Button>
                            </>
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
