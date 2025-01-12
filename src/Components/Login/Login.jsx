import { Button, Form, Input, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import axios from "axios";
import { useState } from "react";

const Login = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setEmail = useAuthStore((state) => state.setEmail);
  const login = async (values) => {
    setLoading(true);
    try {
      const result = await axios.post("http://localhost:5084/api/Authentication/Login", values);
      notification.success({
        message: result?.data?.message,
        description: "Login successfully!",
      });
      setAccessToken(result?.data?.data?.access_token);
      setEmail(result?.data?.data?.email);
      navigate("/");
    } catch (error) {
      notification.error({
        message: error?.response?.data?.message,
      });
    }
    setLoading(false);
  };

  const handleSocialLogin = (provider) => {
    const clientId = provider === "google" ? process.env.REACT_APP_GOOGLE_CLIENT_ID : process.env.REACT_APP_FACEBOOK_APP_ID;
    const redirectUri = "http://localhost:3000/social-login-callback";
    const authUrl =
      provider === "google"
        ? `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid email profile`
        : `https://www.facebook.com/v10.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email,public_profile`;

    const width = 600;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const newWindow = window.open(
      authUrl,
      "_blank",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const interval = setInterval(() => {
      if (newWindow.closed) {
        clearInterval(interval);
        // Handle social login callback
        handleSocialLoginCallback();
      }
    }, 1000);
  };

  const handleSocialLoginCallback = async () => {
    const params = new URLSearchParams(window.location.search);
    const authorizeCode = params.get("code");
    if (authorizeCode) {
      try {
        const result = await axios.post("http://localhost:5084/api/Authentication/LoginSocial", {
          authorizeCode,
        });
        notification.success({
          message: result?.data?.message,
          description: "Social login successfully!",
        });
        setAccessToken(result?.data?.data?.access_token);
        setEmail(result?.data?.data?.email);
        navigate("/");
      } catch (error) {
        notification.error({
          message: error?.response?.data?.message,
        });
      }
    }
  };

  return (
    <>
      <h1>Login</h1>
      <Form
        onFinish={login}
        disabled={loading}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email", message: "Invalid email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Password is required" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <div style={{ marginBottom: 10 }}>
            Don't have account? <Link to={"/register"}>Register</Link>
          </div>
          <div style={{ marginBottom: 10 }}>
            <Link to={"/forgot-password"}>Forgot Password?</Link>
          </div>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <Button
          style={{ marginRight: 10 }}
          onClick={() => handleSocialLogin("google")}
        >
          Login with Google
        </Button>
        <Button onClick={() => handleSocialLogin("facebook")}>
          Login with Facebook
        </Button>
      </div>
    </>
  );
};

export default Login;
