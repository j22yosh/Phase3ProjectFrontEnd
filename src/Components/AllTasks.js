import React from "react";

function AllTasks(props) {
 
  console.log(props)
  const users = props.users;
  const usersList = users.map(user =>
    { return <div>
      <header>
        <form>
          <input type="text" value={user.first_name +" "+ user.last_name}/>
          <input type="text" value={user.tasks[0].task_name}/>
          <input type="text" value={user.categories[0].category_name}/>
        </form>
      </header>
    </div>})
 

  return (
    <div>
      {usersList}
    </div>
  );
}

export default AllTasks;
