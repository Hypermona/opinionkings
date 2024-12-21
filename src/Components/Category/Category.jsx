import React from "react";
import Chip from "@material-ui/core/Chip";
import "./CSS/category.css";
import { CATEGORIES } from "../../Queries/Category";
import { useHistory } from "react-router-dom";
import _category from "../../Store/category";
import useOnceQuery from "../../hooks/useOnceQuery";

function Category() {
  const { category, setCategory } = _category.useContainer();
  const [result] = useOnceQuery({
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
    } else if (e === "trending") {
      push(`/home/trending`);
    }
  };
  const { data } = result;
  return (
    <div className="category-container">
      <Chip
        label={"Home"}
        className="chip rectangle"
        variant="default"
        clickable
        color={category.id === "home" ? "secondary" : "primary"}
        style={{ margin: 5 }}
        onClick={() => handleClick1("home")}
      />
      <Chip
        label={"Trending"}
        className="chip rectangle"
        variant="default"
        clickable
        color={category.id === "trending" ? "secondary" : "primary"}
        style={{ margin: 5 }}
        onClick={() => handleClick1("trending")}
      />
      <Chip
        label={"Following"}
        className="chip rectangle"
        variant="default"
        clickable
        color={category.id === "following" ? "secondary" : "primary"}
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
