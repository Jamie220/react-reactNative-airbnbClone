import * as React from "react";
import { RegisterView } from "./UI/RegisterView";

// container -> view

//container -> connector (react & react-native) - view

export class RegisterConnector extends React.PureComponent {
  dummySubmit = async (values: any) => {
    console.log(values);
    return null;
  };

  render() {
    return <RegisterView submit={this.dummySubmit} />;
  }
}
