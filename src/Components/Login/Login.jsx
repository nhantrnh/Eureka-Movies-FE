import { Button, Form, Input, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import axiosInstance from "../../utils/axios";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setUser, setEmail } from '../../features/auth';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setEmail = useAuthStore((state) => state.setEmail);

  const login = async (values) => {
    setLoading(true);
    try {
      const result = await axiosInstance.post("/Authentication/Login", values);
      notification.success({
        message: result?.data?.message,
        description: "Login successfully!",
      });
      setAccessToken(result?.data?.data?.accessToken);
      dispatch(setUser(result?.data?.data));
      setEmail(result?.data?.data?.email);
      navigate("/");
    } catch (error) {
      notification.error({
        message: error?.response?.data?.message,
      });
    }
    setLoading(false);
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      console.log(`response: ${JSON.stringify(response)}`);
      const result = await axiosInstance.post("/Authentication/LoginSocial", {
        jwtString: response.credential,
      });
      notification.success({
        message: result?.data?.message,
        description: "Social login successfully!",
      });
      setAccessToken(result?.data?.data?.accessToken);
      setEmail(result?.data?.data?.email);
      navigate("/");
    } catch (error) {
      notification.error({
        message: error?.response?.data?.message,
      });
    }
  };

  const handleGoogleLoginError = (error) => {
    notification.error({
      message: "Google login failed",
      description: error?.message || "Please try again.",
    });
  };

  return (
    <>
      <h1>Login</h1>
      <Form
        onFinish={login}
        disabled={loading}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email", message: "Invalid email" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Password is required" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div style={{ marginBottom: 10 }}>
            Don't have an account? <Link to={"/register"}>Register</Link>
          </div>
          <div style={{ marginBottom: 10 }}>
            <Link to={"/forgot-password"}>Forgot Password?</Link>
          </div>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>

          <div style={{ marginTop: 15 }}>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              useOneTap
              render={({ onClick }) => (
                <Button
                  onClick={onClick}
                  type="default"
                  style={{
                    width: "100%",
                    height: "35px",
                    fontWeight: "bold",
                    backgroundColor: "#fff",
                    border: "1px solid #d9d9d9",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png"
                    alt="Google Icon"
                    style={{
                      width: 20,
                      marginRight: 8,
                    }}
                  />
                  Login with Google
                </Button>
              )}
            />
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
