import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, Form, Input, message } from 'antd';
import { BodyContainer, LoginForm, LoginTitle } from "./styles";

interface User {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    const token = localStorage.getItem('accessToken');
    if (storedLoggedInStatus  && token) {
      window.location.href = "/dashboard";
    }
  }, []);

  const onFinish = async (values: User) => {
    try {
      const response = await axios.post('https://api.whnmandiri.co.id:4000/login', {
        username: values.username,
        password: values.password
      });
        const accessToken = response.data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('isLoggedIn', 'true');
        message.success("Login Berhasil");
        history.push("/dashboard");
    } catch (error) {
      console.error('Error:', error);
      message.error("Username / Password Salah");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Gagal:', errorInfo);
  };
  
  return (
    <BodyContainer>
      <LoginForm>
        <LoginTitle>Login</LoginTitle>
        <Form 
          name="basic"
          // labelCol={{ span: 8 }}
          wrapperCol={{ span: 25 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            // label="Username"
            name="username"
            rules={[{ required: true, message: 'Silakan masukkan username!' }]}
          >
            <Input placeholder="Username"/>
          </Form.Item>

          <Form.Item
            // label="Password"
            name="password"
            rules={[{ required: true, message: 'Silakan masukkan password!' }]}
          >
            <Input.Password placeholder="Password"/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', height: 'auto' }}>
              <span>Login</span>
            </Button>
          </Form.Item>
        </Form>
      </LoginForm>
    </BodyContainer>
  );
};

export default Login;
