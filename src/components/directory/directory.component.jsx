import CategoryItem from "../category-item/category-item.component";

import "./directory.styles.scss";

const Directory = ({ catergories }) => {
  return (
    <div className="directory-container">
      {catergories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
