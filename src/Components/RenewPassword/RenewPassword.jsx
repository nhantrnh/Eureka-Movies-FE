import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RenewPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRenewPassword = async (values) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5084/api/Authentication/RenewPassword", values);
      notification.success({
        message: "Password Updated",
        description: "Your password has been successfully updated.",
      });
      navigate("/login");
    } catch (error) {
      notification.error({
        message: error?.response?.data?.message,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <h1>Renew Password</h1>
      <Form
        onFinish={handleRenewPassword}
        disabled={loading}
        name="renew-password"
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
          label="Reset Code"
          name="resetCode"
          rules={[{ required: true, message: "Reset code is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: "New password is required" },
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RenewPassword;
