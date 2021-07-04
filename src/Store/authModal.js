import { useState } from "react";
import { createContainer } from "unstated-next";

function AuthModal() {
  const [authModal, setAuthModal] = useState(false);

  const handleClose = () => setAuthModal(false);
  const handleOpen = () => setAuthModal(true);

  return { authModal, handleClose, handleOpen };
}
export default createContainer(AuthModal);
