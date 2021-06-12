import React from "react";
import Chip from "@material-ui/core/Chip";
import "./category.css";

const categories = ["Movies", "Politics", "Music", "Education", "Love"];

function Category() {
  return (
    <div className="category">
      {categories &&
        categories.map((e) => <Chip label={e} key={e} className="chip" variant="outlined" />)}
    </div>
  );
}

export default Category;
