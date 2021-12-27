import React, { useState} from "react";
import numberHelp from "./numbers";

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNewName} />
      </div>
      <div>
        number: <input value={props.newNum} onChange={props.handleNewNum} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, removePerson }) => {
  return persons.map((person) => (
    <div key={person.name}>
      {person.name} : {person.number}{" "}
      <button type="button" onClick={() => removePerson(person.id)}>
        delete
      </button>
    </div>
  ));
};

const Notification = ({message}) => {
  const noteStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16

  }


  if (message === null){
    return null
  }
  return(
    <div style={noteStyle}>
      {message}
    </div>
  )
}

const App = ({ numbers }) => {
  const [persons, setPersons] = useState(numbers);
  const [newName, setNewName] = useState("new person...");
  const [newNum, setNewNum] = useState("555-555-5555");
  const [mess, setMess] = useState(null);
  const alreadyAdded = (name, num) => {
    for (const i in persons) {
      if (persons[i].name === name || persons[i].number === num) {
        return true;
      }
    }
    return false;
  };



  const addPerson = (event) => {
    const person = { name: newName, number: newNum };
    event.preventDefault();
    if (newName.length > 0 && !alreadyAdded(newName, newNum)) {
      numberHelp.create(person).then((response) => {
        setMess(`added ${person.name}`)
        setPersons(persons.concat(person));
        setNewNum("");
        setNewName("");
      });
    } else {
      alert("type something else!!!");
    }
    window.setTimeout(()=>{
    setMess(null);
    }, 3000)
  };

  const removePerson = (id) => {
    numberHelp.remove(id).then((response) => {
      console.log(response);
      setPersons(persons.filter((p) => p.id !== id));
    });
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNum = (event) => {
    setNewNum(event.target.value);
  };

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={mess}/>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNum={newNum}
        handleNewName={handleNewName}
        handleNewNum={handleNewNum}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} removePerson={removePerson} />
    </div>
  );
};

export default App;
