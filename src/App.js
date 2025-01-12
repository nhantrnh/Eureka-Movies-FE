
import './App.css';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Movies, MovieInformation, Actors, Profile, NavBar, NotFound, Login, Register, ResetPassword, ConfirmEmail, ForgotPassword, RenewPassword } from './Components/index.js'
import useStyles from './App.styles.js'
import { Helmet } from 'react-helmet';

function App() {
  const classes = useStyles();

  return <>
    <Helmet>
      <title>Eureka Movie</title>
    </Helmet>
    <div className={classes.root} >
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route path='/' element={<Movies />} />
          <Route path='/movie/:id' element={<MovieInformation />} />
          <Route path='/actor/:id' element={<Actors />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='*' element={<NotFound />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Register/>} />
          <Route path="/reset-password" element={<ResetPassword/>} />
          <Route path="/confirm-email" element={<ConfirmEmail/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/renew-password" element={<RenewPassword/>} />
        </Routes>
      </main>
    </div>
  </>;
}

export default App;
