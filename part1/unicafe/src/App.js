import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [avg, setAvg] = useState(0)
  const [total, setTotal] = useState(0)
  const [count, setCount] = useState(0)
  const [positive, setPositive] = useState(0)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClicks = () => {
    setTotal(total + 1)
    setCount(count + 1)
    setPositive(positive + 1)
    setAvg(total / count)
    setGood(good + 1)
  }

  const handleNeutralClicks = () => {
    setTotal(total + 1)
    setAvg(total / count)
    setNeutral(neutral + 1)
  }

  const handleBadClicks = () => {
    setTotal(total + 1)
    setCount(count - 1)
    console.log(count)
    console.log(total)
    setAvg(total / count)
    setBad(bad + 1)
  }

  const StatisticLine = (props) => {
    let p = '%'
    if(props.text != 'positive') p = ""
    return (
      <div>        
        <p>{props.text} {props.value} {p}</p>
      </div>
    )
  }

  const Statistics = (props) => {
      if (count>0) {
      return(
        <div>
        <h1>Statistics</h1>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={total}/>
        <StatisticLine text="average" value={count/total}/>
        <StatisticLine text="positive" value={positive/total*100}/>
        </div>
      )} else {
        return( <p>No feedback given</p>)
      }
  }
  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodClicks}>
      good
      </button>
      <button onClick={handleNeutralClicks}>
        neutral
      </button>
      <button onClick={handleBadClicks}>
        bad
      </button> 
      <Statistics/>
    </div>
  )
}

export default App