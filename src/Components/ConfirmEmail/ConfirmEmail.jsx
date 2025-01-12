import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ConfirmEmail() {
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        navigate('/login'); // Adjust the path if necessary
    };

    return (
        <Container>
            <Box
                textAlign="center"
                style={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '20px 0' }}
            >
                <Typography variant="h5" component="h1" style={{ marginBottom: '24px' }}>
                    Email Confirmation Sent
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '16px' }}>
                    We have sent a confirmation email to your registered email address. Please check your inbox and confirm your email.
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '32px' }}>
                    Once you confirm your email, you can log in to your account.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGoToLogin}
                    style={{ padding: '12px' }}
                >
                    Go to Login
                </Button>
            </Box>
        </Container>
    );
}
