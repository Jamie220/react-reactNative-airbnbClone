import * as React from "react";

import { Form, Input } from "antd";
import { FieldProps } from "formik";

export const InputField: React.SFC<FieldProps<any> & {
  prefix: JSX.Element;
}> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];

  return (
    <Form.Item
      help={errorMsg ? errors[field.name] : null}
      validateStatus={errorMsg ? "error" : "validating"}
    >
      <Input {...field} {...props} />
    </Form.Item>
  );
};
