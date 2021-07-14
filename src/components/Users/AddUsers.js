import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUsers = (props) => {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredUserAge, setEnteredUserAge] = useState("");
  const [error, setError] = useState("");
  const addUserHandler = (event) => {
    event.preventDefault();
    if (
      enteredUserName.trim().length === 0 ||
      enteredUserAge.trim().length === 0
    ) {
      setError({
        title: "Invalid input",
        message: "Please input a valid name and age.",
      });
      return;
    }
    if (+enteredUserAge <= 0) {
      setError({
        title: "Invalid age",
        message: "Please input a valid age(>0)",
      });
      return;
    }
    props.onAddUser(enteredUserName, enteredUserAge);
    setEnteredUserName("");
    setEnteredUserAge("");
  };
  const userSubmitHandler = (event) => {
    setEnteredUserName(event.target.value);
  };
  const ageSubmitHandler = (event) => {
    setEnteredUserAge(event.target.value);
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <div>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="userName">User Name</label>
          <input
            id="userName"
            type="text"
            value={enteredUserName}
            onChange={userSubmitHandler}
          ></input>
          <label htmlFor="age">Age (Year)</label>
          <input
            id="age"
            type="number"
            value={enteredUserAge}
            onChange={ageSubmitHandler}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUsers;
