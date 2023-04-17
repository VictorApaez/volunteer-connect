import React, { createContext, useState, useEffect } from "react";
import { getUser } from "../services/userService";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser(token)
        .then((res) => {
          console.log(res);
          setUser(res.user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
