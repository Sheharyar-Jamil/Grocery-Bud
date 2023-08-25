import React, { useEffect } from "react";
import { useState } from "react";
import Alert from "./Alert";
import List from "./components/List";

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }

  else{
    return [];
  }
}

function App() {
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const inputChangeHandler = (event) => {
    setName(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if(!name){
      setAlert({show:true, msg:"please enter value", type:"danger"})
    }

    else if(name && isEditing){
      const updatedItem = list.map((item) =>{
        if(item.id === editID){
          return {...item, name:name}
          
        }
        return item;
      })
      setList(updatedItem);
      setName('');
      setIsEditing(false);
      setEditID(null);
      setAlert({show: true, msg: "Value Changed", type: "success"});
    }

    else{
      setAlert({show: true, msg:"item successfully added to the list", type:"success"})
      const newItem = {id: new Date().getTime().toString(), name: name}
      setList([...list, newItem]);
      setName('');
      
    }
  };

  const removeAlert = () => {
    setAlert({show: false, msg:"", type: ""});
  }

  const clearListHandler = () => {
    setAlert({show:true, msg:"empty list", type:"danger"});
    setList([]);
  }

  const removeItemHandler = (id) => {
    setAlert({ show: true, msg: "item removed from the list", type: "danger" });
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  };

  const editItemHandler = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.name);
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={formSubmitHandler}>
        {alert.show ? <Alert msg={alert.msg} type={alert.type} removeAlert={removeAlert} /> : ""}
        <h3>grocery bud</h3>
        <div className="form-control">
        <input
        className="grocery"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={inputChangeHandler}
          placeholder="e.g. eggs"
        />
        <button type="submit" className="submit-btn">
          {isEditing ? (
            'edit'
          ): (
            'submit'
          )}
        </button>
        </div>
      </form>
      <div className="grocery-container">
        {list.map((item, index) => {
          return(
            <List key={index} name={item.name} removeItem={removeItemHandler} id={item.id} editItem={editItemHandler}/>
          )
        })}
        <button className="clear-btn" onClick={clearListHandler}>clear items</button>
      </div>
    </section>
  );
}

export default App;
