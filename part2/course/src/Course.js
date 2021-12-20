import React from "react";

const Header = (props) => {
    return (
      <>
        <h1>{props.course}</h1>
      </>
    );
  };
  
  const Content = ({parts}) => {
    return parts.map(part=> <Part key={part.name} name = {part.name} exercises={part.exercises}/>);  
  };
  
  const Part = (props) => {
    return (
        <p>
          {props.name} {props.exercises}
        </p>
    );
  };
  
  const Total = ({parts}) => {
    const exercises = parts.map(part =>part.exercises)
    return (
      <>
        <strong>
          Number of exercises {" "}
          {exercises.reduce((a,b)=>a+b,0)}
        </strong>
      </>
    );
  };
  
  const Course = ({course}) =>{
    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    );
  }

export default Course