import * as React from "react";
import { RegisterController } from "@airbnb/controller";

import { RegisterView } from "./UI/RegisterView";

// container -> view

//container -> connector (react & react-native) - view

//controller -> connector -> view

export class RegisterConnector extends React.PureComponent {
  render() {
    return (
      <RegisterController>
        {({ submit }) => <RegisterView submit={submit} />}
      </RegisterController>
    );
  }
}
