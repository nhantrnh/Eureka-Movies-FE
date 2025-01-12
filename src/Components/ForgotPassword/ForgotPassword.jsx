import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (values) => {
    setLoading(true);
    try {
      const result = await axios.get(`http://localhost:5084/api/Authentication/ForgotPassword?email=${values.email}`);
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
          rules={[{ required: true, type: "email", message: "Invalid email" }]}
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
