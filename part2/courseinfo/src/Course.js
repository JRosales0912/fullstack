const Course = ({course}) => {
  
    const Header = (props) => {
      return (
        <h1>{props.course}</h1>
      )
    }
  
    const Part = (props) => {
      return (
          <>{props.part} {props.exercise}</>
      )
    }
  
    const Total = (props) => {
        const ex = props.parts.reduce(function(previousValue, currentValue) {
            return { exercises: previousValue.exercises + currentValue.exercises }
        });
      //reduce already added  
      return(<p>Number of exercises {ex.exercises}</p>)
    }
    const Content = (props) => {
      return (
        <div>
            {props.parts.map(part => <li key={part.id}><Part id={part.id} part={part.name} exercise = {part.exercises}/></li>)}
        </div>
      )
    }
    return (
      <div key={course.id}>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }
  
  export default Course