import React from "react";
import { Form, Input, Button } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginForm() {
  // this arrow function will process login
  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log("Login with account", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/invalid-email":
            console.log("Sai định dạng email!");
            break;
          case "auth/user-not-found":
            console.log("Tài khoản không tồn tại!");
            break;
          case "auth/wrong-password":
            console.log("Sai password!");
            break;
          default:
            console.log("Lỗi không xác định!");
            break;
        }
      });
  };

  // get values form submit
  const onFinish = (values) => {
    // value input
    console.log("Gía trị trả về khi submit:", values);
    handleLogin(values.email, values.password);
  };

  const onFinishFailed = (errorInfo) => {};
  return (
    <Form
      name="basic"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 5 }}
      initialValues={{ remember: true }}
      // catch event submit
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Địa chỉ Email"
        name="email"
        rules={[{ required: true, message: "Vui lòng điền Email" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật khẩu "
        name="password"
        rules={[{ required: true, message: "Vui lòng điền mật khẩu" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
}
