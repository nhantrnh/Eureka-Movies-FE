import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Link, FormControlLabel, Checkbox, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [errors, setErrors] = useState({});

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
    const handleAgreedChange = (e) => setAgreed(e.target.checked);

    const validateForm = () => {
        const newErrors = {};

        if (!username) {
            newErrors.username = 'Username is required.';
        }
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,6}$/;
        if (!email || !emailPattern.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!password || password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }
        if (!agreed) {
            newErrors.agreed = 'You must agree to the terms and conditions.';
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

    const handleToLogin = async () => {
        navigate('/login');
    };

    return (
        <Container>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                style={{ textAlign: 'center',  width: '100%', maxWidth: '600px', alignItems: 'center', margin: '0 auto', padding: '20px 0' }}
            >
                <Typography variant="h5" component="h1" style={{ marginBottom: '24px', textAlign: 'center'}}>
                    Create Account
                </Typography>

                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={handleUsernameChange}
                    error={!!errors.username}
                    helperText={errors.username}
                    style={{ marginBottom: '16px' }}
                />

                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={handleEmailChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    style={{ marginBottom: '16px' }}
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    type="password" // Hide password by default
                    fullWidth
                    value={password}
                    onChange={handlePasswordChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    style={{ marginBottom: '16px' }}
                />

                <TextField
                    label="Confirm Password"
                    variant="outlined"
                    type="password" // Hide confirm password by default
                    fullWidth
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    style={{ marginBottom: '16px' }}
                />

                <FormControlLabel
                    control={<Checkbox checked={agreed} onChange={handleAgreedChange} />}
                    label="I agree to the Terms and Conditions"
                    style={{ marginBottom: '16px' }}
                />
                {errors.agreed && <div style={{ color: 'red', fontSize: '12px' }}>{errors.agreed}</div>}

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    style={{ marginBottom: '16px', padding: '12px' }}
                >
                    Register
                </Button>

                <Typography variant="body2" style={{ textAlign: 'center' }}>
                    Already have an account? <Link onClick={handleToLogin} style={{cursor: 'pointer'}}  underline="none">Login</Link>
                </Typography>
            </Box>
        </Container>
    );
}
