import React from "react";
import Category from "./category";
import Theme from "./theme";
import Posts from "./posts";
import FinalTheme from "./finalTheme";
import Users from "./users";
import AuthModal from "./authModal";
import Token from "./token";

// const states = [Counter, Theme, Posts, FinalTheme, Users];
// const Provider = (props) => {
//   return (
//     <>
//      {states.map(State=><State.Provider>)}
//        {props.children}
//      {states.map(State=></State.Provider>)}
//     </>
//   );
// };
// export default Provider;
const Provider = (props) => {
  return (
    <Token.Provider>
      <Users.Provider>
        <AuthModal.Provider>
          <Theme.Provider>
            <Posts.Provider>
              <Category.Provider>
                <FinalTheme.Provider>{props.children}</FinalTheme.Provider>
              </Category.Provider>
            </Posts.Provider>
          </Theme.Provider>
        </AuthModal.Provider>
      </Users.Provider>
    </Token.Provider>
  );
};
export default Provider;
