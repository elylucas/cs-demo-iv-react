import TeaCategoryList from '../components/TeaCategoryList';
import { getTeaCategories } from '../store';
import { connect } from 'react-redux';

// I typically put HOC at the bottom of the component instead of a separate file, but thats just personal preference

const mapStateToProps = (state: any) => ({
  categories: getTeaCategories(state)
});

export default connect(mapStateToProps)(TeaCategoryList);
