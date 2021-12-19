import React, { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);
const Header = (props) => {
  return (
    <>
      <h1>{props.head}</h1>
    </>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  let pointInit = new Array(anecdotes.length).fill(0);
  const [selected, setSelected] = useState(0);
  const [point, setPoints] = useState(pointInit);
  const [top, setTop] = useState(0);
   

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  const  randomAnecdote = () =>{
    const rand = getRandomInt(0, anecdotes.length-1);
    setSelected(rand);
  } 
  const addVote = () =>{
    let copy = [...point];
    copy[selected] += 1;
    console.log(copy);
    setPoints(copy);
    
    if(point[selected]>point[top]){
      setTop(selected);
    }
    
  }

  return (
    <div>
      <Header head={"Anecdote of the day"}/>
      <p>{anecdotes[selected]}</p>
      <p>This has {point[selected]} votes</p>
      <Button handleClick={() => addVote()} text={"vote"} />
      <Button handleClick={() => randomAnecdote()} text={"next anecdote"} />
      <Header head={"Anecdote with most votes"}/>
      <p>{anecdotes[top]}</p>

    </div>
    
  )
}

export default App