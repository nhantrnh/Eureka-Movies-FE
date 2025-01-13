import './App.css';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Movies, MovieInformation, Actors, Profile, NavBar, NotFound, RatingList, Login, ActorsMovieList, WatchingList, FavoriteList, Register, ResetPassword, ActorsList, ConfirmEmail, ForgotPassword, RenewPassword, PublicRoute, PrivateRoute } from './Components/index.js';
import useStyles from './App.styles.js';
import { Helmet } from 'react-helmet';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>Eureka Movie</title>
      </Helmet>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {/* Remove BrowserRouter here */}
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <Routes>
              <Route path='/' element={<PublicRoute><Movies /></PublicRoute>} />
              <Route path='/movie/:tmdbId' element={<PrivateRoute><MovieInformation /></PrivateRoute>} />
              <Route path='/actor/:id' element={<PrivateRoute><Actors /></PrivateRoute>} />
              <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path='*' element={<PublicRoute><NotFound /></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><Register /></PublicRoute>} />
              <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />
              <Route path="/confirm-email" element={<PublicRoute><ConfirmEmail /></PublicRoute>} />
              <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
              <Route path="/renew-password" element={<PublicRoute><RenewPassword /></PublicRoute>} />
              <Route path='/actors' element={<PrivateRoute><ActorsList /></PrivateRoute>} />
              <Route path='/profile/watchlist' element={<PrivateRoute><WatchingList /></PrivateRoute>} />
              <Route path='/profile/favorite' element={<PrivateRoute><FavoriteList /></PrivateRoute>} />
              <Route path='/profile/ratings' element={<PrivateRoute><RatingList /></PrivateRoute>} />
              <Route path="/movie/:tmdbId/casts" element={<PrivateRoute><ActorsMovieList /></PrivateRoute>} />
            </Routes>
          </GoogleOAuthProvider>
        </main>
      </div>
    </>
  );
}

export default App;
