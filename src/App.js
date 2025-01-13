import './App.css';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Movies, MovieInformation, Actors, Profile, NavBar, NotFound, Login, Register, ResetPassword, ConfirmEmail, ForgotPassword, RenewPassword, PublicRoute, PrivateRoute } from './Components/index.js';
import useStyles from './App.styles.js';
import { Helmet } from 'react-helmet';

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
          <Routes>
            <Route path='/' element={<PublicRoute><Movies /></PublicRoute>} />
            <Route path='/movie/:tmdbId' element={<PrivateRoute><MovieInformation /></PrivateRoute>} />
            <Route path='/actor/:id' element={<PrivateRoute><Actors /></PrivateRoute>} />
            <Route path='/profile/:id' element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path='*' element={<PublicRoute><NotFound /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />
            <Route path="/confirm-email" element={<PublicRoute><ConfirmEmail /></PublicRoute>} />
            <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
            <Route path="/renew-password" element={<PublicRoute><RenewPassword /></PublicRoute>} />
            <Route path='/movie/:tmdbId/casts' element={<PrivateRoute><Actors /></PrivateRoute>} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
