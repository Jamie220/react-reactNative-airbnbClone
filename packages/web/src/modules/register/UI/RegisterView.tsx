/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import * as yup from "yup";
import { withFormik, FormikErrors, FormikProps } from "formik";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./RegisterView.css";

type FormValues = {
  email: string;
  password: string;
};

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

const MyForm: React.SFC<FormikProps<FormValues> & Props> = props => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "auto" }}>
        <Form
          onSubmitCapture={props.handleSubmit}
          initialValues={{ remember: true }}
          //   onFinish={onFinish}
        >
          <Form.Item
            help={
              props.touched.email && props.errors.email
                ? props.errors.email
                : null
            }
            validateStatus={
              props.touched.email && props.errors.email ? "error" : "validating"
            }
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              onChange={props.handleChange}
              value={props.values.email}
              onBlur={props.handleBlur}
            />
          </Form.Item>
          <Form.Item
            help={
              props.touched.password && props.errors.password
                ? props.errors.password
                : null
            }
            validateStatus={
              props.touched.email && props.errors.email ? "error" : "validating"
            }
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={props.handleChange}
              value={props.values.password}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <div style={{ display: "block", textAlign: "center" }}>
              <a href="">register</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const emailNotLongEnough = "email must be at least 3 characters";
const passwordNotLongEnough = "password must be at least 3 characters";
const invalidEmail = "email must be a valid email";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required(),
  password: yup
    .string()
    .min(3, passwordNotLongEnough)
    .max(255)
    .required()
});

export const RegisterView = withFormik<Props, FormValues>({
  validationSchema,
  //   validateOnChange: false,
  //   validateOnBlur: false,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { setErrors, props }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(MyForm);
