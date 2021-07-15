import React from "react";
import Chip from "@material-ui/core/Chip";
import { useQuery } from "urql";
import "./CSS/category.css";
import { CATEGORIES } from "../../Queries/Category";
import { useHistory } from "react-router-dom";
import _category from "../../Store/category";

function Category() {
  const { category, setCategory } = _category.useContainer();
  const [result] = useQuery({
    query: CATEGORIES,
  });
  const { push } = useHistory();
  const handleClick = (e) => {
    setCategory(e);
    push(`/home/category/${e.id}`);
  };
  const handleClick1 = (e) => {
    setCategory({ id: e });
    if (e === "home") {
      push(`/home`);
    } else if (e === "following") {
    }
  };
  const { data, fetching, error } = result;
  console.log("data", data);
  console.log("category", category);
  return (
    <div className="category">
      <Chip
        label={"Home"}
        className="chip"
        variant={category.id === "home" ? "default" : "outlined"}
        clickable
        style={{ margin: 5 }}
        onClick={() => handleClick1("home")}
      />
      <Chip
        label={"Trending"}
        className="chip"
        variant={category.id === "trending" ? "default" : "outlined"}
        clickable
        style={{ margin: 5 }}
        onClick={() => handleClick1("trending")}
      />
      <Chip
        label={"Following"}
        className="chip"
        variant={category.id === "following" ? "default" : "outlined"}
        clickable
        style={{ margin: 5 }}
        onClick={() => handleClick1("following")}
      />
      <br />
      {data &&
        data.categories.map((e) => (
          <Chip
            label={e.name}
            key={e.name}
            className="chip"
            variant={category.id === e.id ? "default" : "outlined"}
            clickable
            style={{ margin: 5 }}
            onClick={() => handleClick(e)}
          />
        ))}
    </div>
  );
}

export default Category;
