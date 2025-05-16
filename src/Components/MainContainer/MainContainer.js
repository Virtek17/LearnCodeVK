import PropTypes from "prop-types";
import style from "./MainContainer.module.css";

const MainContainer = ({ children, className }) => {
  return <div className={`${style.container} ${className}`}>{children}</div>;
};

export default MainContainer;
MainContainer.propTypes = {
  children: PropTypes.node, // Позволяет передавать любые React-элементы
  className: PropTypes.string,
};
