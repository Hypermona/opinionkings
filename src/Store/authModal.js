import { useState } from "react";
import { createContainer } from "unstated-next";

function AuthModal() {
  let [authModal, setAuthModal] = useState(false);
  return { authModal, setAuthModal };
}
export default createContainer(AuthModal);
