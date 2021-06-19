import React from "react";
import Counter from "./counter";
import Theme from "./theme";
import Posts from "./posts";
import FinalTheme from "./finalTheme";
import Users from "./users";

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
    <Users.Provider>
      <Theme.Provider>
        <Posts.Provider>
          <FinalTheme.Provider>{props.children}</FinalTheme.Provider>
        </Posts.Provider>
      </Theme.Provider>
    </Users.Provider>
  );
};
export default Provider;
