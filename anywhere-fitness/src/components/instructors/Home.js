import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllClassesByInstructor } from "../../actions";
import cookie from "react-cookies";
import InstructorClass from "./instructorClass";
import { Link } from "react-router-dom";

export class Home extends Component {
  componentDidMount() {
    this.props.getAllClassesByInstructor(cookie.load("user").id);
  }

  render() {
    return (
      <div className="home">
        <div className="instructor-controls">
          <div className="home-top">
            <h1 className="home-header">List of My Classes</h1>
            <Link to="/instructor/add-class">
              <button className="add-class-btn">Add Class</button>
            </Link>
          </div>
          <div className="instructor-classes">
            {this.props.instructorClasses.map(instructorClass => {
              return (
                <InstructorClass
                  key={instructorClass.classId}
                  instructorClass={instructorClass}
                  getClassByInstructor={this.props.getClassByInstructor}
                  setUpdateForm={this.setUpdateForm}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    instructorClasses: state.homeReducer.instructorClasses,
    instructor: state.loginReducer.instructor,
    error: state.homeReducer.error
  };
};

export default connect(
  mapStateToProps,
  {
    getAllClassesByInstructor,
    
  }
)(Home);