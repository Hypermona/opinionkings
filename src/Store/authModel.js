import { useState } from "react";
import { createContainer } from "unstated-next";

function AuthModel() {
  let [authModel, setAuthModel] = useState(false);
  return { authModel, setAuthModel };
}
export default createContainer(AuthModel);
