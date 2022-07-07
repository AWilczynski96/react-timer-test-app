// importing axios, we will make api call
import axios from "axios";
// we need to have a state
import { useState } from "react";

export default function RandomUser() {
  // we have user object in state
  const [user, setUser] = useState();

  // this function will be handling the api call
  const loadRandomUser = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api");
      // updates the user object with the loaded data
      setUser(response.data.results[0]);
    } catch (error) {}
  };

  return (
    <>
      <button onClick={loadRandomUser}>Load Random User</button>
      // if we have user, lets display the name
      {user && (
        <h1>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h1>
      )}
    </>
  );
}
