import React from "react";
import Chip from "@material-ui/core/Chip";
import { useQuery } from "urql";
import "./category.css";
import CATEGORIES from "../../Queries/Category";

function Category() {
  const [result] = useQuery({
    query: CATEGORIES,
  });
  const { data, fetching, error } = result;
  console.log("data", data);
  return (
    <div className="category">
      {data &&
        data.categories.map((e) => (
          <Chip
            label={e.name}
            key={e.name}
            className="chip"
            variant="outlined"
            clickable
            style={{ margin: 5 }}
          />
        ))}
    </div>
  );
}

export default Category;
