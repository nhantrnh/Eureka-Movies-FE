import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);

    const validateForm = () => {
        const newErrors = {};
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!email || !emailPattern.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Password reset link sent to:', email);
            // Add API call or further logic here
        }
    };

    const handleToLogin = async () => {
        navigate('/login');
    }
    return (
        <Container>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}
            >
                <Typography variant="h5" component="h1" style={{ marginBottom: '24px' }}>
                    Reset Password
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '24px' }}>
                    Enter the email address associated with your account and we'll send you a link to reset your password.
                </Typography>

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

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    style={{ marginBottom: '16px', padding: '12px' }}
                >
                    Send Reset Link
                </Button>
                <Typography variant="body2">
                    <Link onClick={handleToLogin} style={{cursor: 'pointer'}}  underline="none">Logn In</Link>
                </Typography>
            </Box>
        </Container>
    );
}
