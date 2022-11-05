import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onLoadMore }) => (
  <button className={css.Button} onClick={onLoadMore} type="button">
    LoadMore
  </button>
);

export default Button;

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
