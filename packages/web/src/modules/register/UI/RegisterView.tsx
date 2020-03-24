/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";

import { withFormik, FormikErrors, FormikProps, Field } from "formik";
import { Form as AntForm, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { validUserSchema } from "@airbnb/common";

import "./RegisterView.css";
import { InputField } from "../../shared/inputField";

type FormValues = {
  email: string;
  password: string;
};

interface MyFormProps {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

const MyForm: React.SFC<FormikProps<FormValues> & MyFormProps> = props => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "auto" }}>
        <AntForm
          onSubmitCapture={props.handleSubmit}
          initialValues={{ remember: true }}
          //   onFinish={onFinish}
        >
          <Field
            name="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            component={InputField}
          />
          <Field
            name="password"
            type="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            component={InputField}
          />
          <AntForm.Item>
            <AntForm.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </AntForm.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </AntForm.Item>

          <AntForm.Item>
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
          </AntForm.Item>
        </AntForm>
      </div>
    </div>
  );
};

export const RegisterView = withFormik<MyFormProps, FormValues>({
  validationSchema: validUserSchema,
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
