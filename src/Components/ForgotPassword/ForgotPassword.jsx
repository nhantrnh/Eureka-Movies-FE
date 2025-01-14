import { Button, Form, Input, notification } from "antd";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (values) => {
    setLoading(true);
    try {
      const result = await axiosInstance.get(`http://localhost:5084/api/Authentication/ForgotPassword?email=${values.email}`);
      notification.success({
        message: result?.data?.message,
        description: "Check your email for the reset code.",
      });
      setTimeout(() => {
        navigate("/renew-password");
      }, 2000);
    } catch (error) {
      notification.error({
        message: error?.response?.data?.message,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <h1>Forgot Password</h1>
      <div style={{ marginBottom: 20, fontSize: "16px", color: "#555" }}>
        <p>Please enter your Gmail address below. A password reset link will be sent to your email.</p>
        <p>If you don't receive the email, please check your spam folder.</p>
      </div>
      <Form
        onFinish={handleForgotPassword}
        disabled={loading}
        name="forgot-password"
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
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Invalid email format" },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
              message: "Please enter a valid Gmail address",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgotPassword;
