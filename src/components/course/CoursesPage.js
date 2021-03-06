import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators} from 'redux';
class CoursesPage extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      course: {title: ''}
    };
    this.onTitleChange=this.onTitleChange.bind(this);
    this.onClickSave=this.onClickSave.bind(this);
  }
  onTitleChange(event){
    const course = this.state.course;
    course.title=event.target.value;
    this.setState({course: course});
  }
  onClickSave(){
    this.props.actions.createCourse(this.state.course);
  }
  courseRow(course,index){
    return <div key={index}> {course.title}</div>;
  }
  render(){
    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <h2>Add Course</h2>
        <input type="text"
               onChange={this.onTitleChange}
               value={this.state.course.title}/>
        <input type="submit"
               value="Save"
               onClick={this.onClickSave} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state,ownProps) => {
  return {
    courses: state.courses
  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    actions: bindActionCreators(courseActions,dispatch)
  }
}
//no mapDispatchToProps means the component gets
export default connect(mapStateToProps,mapDispatchToProps)(CoursesPage);
