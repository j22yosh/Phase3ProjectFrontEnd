import React from "react";

function List() {
  return (
    <div>
      <header>
        <form>
          <input type="text" placeholder="Enter name" />
          <input type="text" placeholder="Enter task" />
          <input type="text" placeholder="Enter category" />
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default List;
