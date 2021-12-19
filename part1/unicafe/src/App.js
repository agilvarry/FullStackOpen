import React, { useState } from "react";

const Header = (props) => {
  return (
    <>
      <h1>{props.head}</h1>
    </>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const StatisticLine = (props) => (
  <tr>
    <td>{props.kind}</td>
    <td>{props.stat}</td>
  </tr>
);

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const positive = 100 * (good / all) + "%";
  if (good > 0 || bad > 0 || neutral > 0) {
    return (
      <table>
        <tbody>
          <tr>
            <th>Statistics</th>
          </tr>
          <StatisticLine kind={"good"} stat={good} />
          <StatisticLine kind={"neutral"} stat={neutral} />
          <StatisticLine kind={"bad"} stat={bad} />
          <StatisticLine kind={"all"} stat={all} />
          <StatisticLine kind={"average"} stat={average} />
          <StatisticLine kind={"positive"} stat={positive} />
        </tbody>
      </table>
    );
  } else {
    return <div>No feedback given</div>;
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <Header head={"give feedback"} />
      <Button handleClick={() => setGood(good + 1)} text={"good"} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button handleClick={() => setBad(bad + 1)} text={"bad"} />
      <Header head={" "} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  );
};

export default App;
