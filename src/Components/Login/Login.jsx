import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Link, IconButton, Slider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import the visibility icons
import useStyles from './Login.style.js';

export default function Login() {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleClickShowPassword = () => setShowPassword(!showPassword); // Toggle password visibility
    const handleMouseDownPassword = (e) => e.preventDefault(); // Prevent focus loss on mouse down

    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        // Validate email
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!email || !emailPattern.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        // Validate password
        if (!password || password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Proceed with form submission (e.g., call API)
            console.log('Form submitted');
        }
    };
    
    const handleToSignUp = async () => {
        navigate('/signup');
    }

    const handleResetPassword = async () => {
        navigate('/reset-password');
    }

    return (
        <Container>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} style={{ textAlign: 'center', width: '100%', maxWidth: '800px', alignItems: 'center', margin: '0 auto', padding: '20px 0' }}>
                <Typography variant="h5" component="h1" style={{ marginBottom: '10px'}} >
                    Login
                </Typography>
                <TextField style={{ marginBottom: '10px' }} 
                    className={classes.textField}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={handleEmailChange}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    style={{ marginBottom: '10px' }} 
                    label="Password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'} // Toggle between text and password
                    fullWidth
                    value={password}
                    onChange={handlePasswordChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        ),
                    }}
                />
                <Button variant="contained" color="primary" fullWidth className={classes.button} type="submit">
                    Login
                </Button>
                <Typography variant="body2" className={classes.forgotPassword}>
                    <Link onClick={handleResetPassword} style={{cursor: 'pointer'}}  underline="none">Forgot Password?</Link>
                </Typography>
                <Typography variant="body2" className={classes.link}>
                    Don't have an account? <Link onClick={handleToSignUp} style={{cursor: 'pointer'}} underline="none">Sign Up</Link>
                </Typography>
            </Box>
        </Container>
    );
};

