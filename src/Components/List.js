import React, { useEffect, useState} from 'react'



function List() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch('http://localhost:9292/users')
            .then(response => response.json())
            .then(data => setUsers(data));
               
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    console.log(users)
  return (
    <div>
<header>

  <form>
    <input type='text' placeholder='Enter name'/>
    <input type='text' placeholder='Enter task'/>
    <input type='text' placeholder='Enter category'/>
    <button type='submit'>Submit</button>
       
    
  </form>
  </header>
      </div>
  )
}

export default List