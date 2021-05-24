import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../Redux/category";
import Chip from "@material-ui/core/Chip";
import "./category.css";

function Category() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  const { categories, loading } = useSelector((state) => state.category);
  return (
    <div className="category">
      {!loading &&
        categories.map((e) => <Chip label={e} key={e} className="chip" variant="outlined" />)}
    </div>
  );
}

export default Category;
