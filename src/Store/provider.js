import React from "react";
import Counter from "./counter";
import Theme from "./theme";
import Posts from "./posts";
import FinalTheme from "./finalTheme";
import Users from "./users";

const Provider = (props) => {
  return (
    <Counter.Provider>
      <Theme.Provider>
        <Posts.Provider>
          <FinalTheme.Provider>
            <Users.Provider>{props.children}</Users.Provider>
          </FinalTheme.Provider>
        </Posts.Provider>
      </Theme.Provider>
    </Counter.Provider>
  );
};
export default Provider;
