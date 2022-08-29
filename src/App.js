import React, { useEffect, useState } from "react";
import "./App.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


library.add(faTrash);

function App() {
  //state holding DB data
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  //state holding response data from fetches
  const [newUser, setNewUser] = useState([]);
  const [newTask, setNewTask] = useState([]);
  const [newCategory, setNewCategory] = useState([]);
//State holding form submission
  const [submission, setSubmission] = useState({
      name: "",
      task: "",
      category: ""
    }
  );


useEffect(() => {
  // GET request to API for users~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  fetch("http://localhost:9292/users")
    .then((response) => response.json())
    .then((data) => setUsers(data));

  // 
}, []);
useEffect(() => {
  // GET request to API for tasks~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  fetch("http://localhost:9292/tasks")
    .then((response) => response.json())
    .then((data) => setTasks(data));

  //
}, []);
useEffect(() => {
  // GET request to API for categories~~~~~~~~~~~~~~~~~~~~~~~~~
  fetch("http://localhost:9292/categories")
    .then((response) => response.json())
    .then((data) => setCategories(data));

  // empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);



  function changeHandler(e){
    
      setSubmission({
        ...submission,[e.target.name]: e.target.value,})
      
    
  }
  function submitHandler(e){
    e.preventDefault()
    
    const [fname, lname] = submission.name.split(' ');
   const fullname = {
    first_name: `${fname}`,
    last_name: `${lname}`,
   }
   const dbcategory = {
    category_name: submission.category
   }   

//Post method for users
   fetch("http://localhost:9292/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       },
       body: JSON.stringify(fullname),
   })
   .then((r) => r.json())
   .then((newUser) => {setNewUser(newUser)
   })
   
   console.log(newUser)
// Post method for categories
   fetch("http://localhost:9292/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       },
       body: JSON.stringify(dbcategory),
   })
   .then((r) => r.json())
   .then((newCategory) => {
    setNewCategory(newCategory)
   })
   console.log(newCategory)

   const dbtask = {
    task_name: submission.task,
    category_id: newCategory.id,
    user_id: newUser.id
       
  }
  console.log(dbtask)
  // fetch("http://localhost:9292/tasks", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //      },
  //      body: JSON.stringify(dbtask),
  //  })
  //  .then((r) => r.json())
  //  .then((newTask) => {
  //   setNewTask(newTask)
  //  })
  //  console.log(newTask)


  //  setTasks(tasks => [...tasks, newTask])
  }

console.log(newUser.id)

const deleteTask = (index) => {
  console.log(index)
  const newList = tasks;
  newList.splice(index, 1);
  setTasks([...newList]);


}
// function handleDeleteTodo(index){
//   fetch(`http://localhost:9292/tasks/${index}`,{
//     method: "DELETE",
//   }).then((r) => {
//     if (r.ok){
//       deleteTask(index)
//     }
//   });
// }
  
  const taskList = tasks.map(task =>
    { return <div key={task.id}>
      <header>
        <form className="list">
          <input type="text" id={task.user.id} value={task.user.first_name +" "+ task.user.last_name}/>
          <input type="text" value={task.task_name}/>
          <input type="text" value={task.category.category_name}/>
          <span onClick={deleteTask}><FontAwesomeIcon className="faicons" icon={"trash"}></FontAwesomeIcon></span>
        </form>
      </header>
    </div>})
  
  // const {name, task, category } = submission
  return (
    <div className="App">
      <header className="App-header"><div>
      <header>
        <form onSubmit={submitHandler}>
          <input type="text" name="name" placeholder="Enter name" value={submission.name} onChange={changeHandler} />
          <input type="text" name="task" placeholder="Enter task" value={submission.task} onChange={changeHandler}/>
          <input type="text" name="category" placeholder="Enter category" value={submission.category} onChange={changeHandler}/>
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>{taskList}</header>
      
    </div>
  );
}


export default App;
