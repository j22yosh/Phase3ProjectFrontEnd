
import React,{ useEffect, useState } from 'react';
import './App.css';
import AllTasks from './Components/AllTasks';
import List from './Components/List';


function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState([]);
  
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("http://localhost:9292/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <List />
        <AllTasks users={users} setUsers={setUsers} newUser={newUser} setNewUser={setNewUser}/>
        </header>
        
    </div>
    
  );
}

export default App;
