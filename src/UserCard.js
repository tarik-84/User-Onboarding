import React from "react";

const UserCard = props => {
   
  return (
    <div>
      {props.userList.map(user => (
        <div key={user.id}>
           <ul>
              <li>{user.name}</li>
              <li>{user.email}</li>
              <li>{user.password}</li>
              <li>{user.tos}</li>
            </ul>
        </div>
       ))}
    </div>
  );
};

export default UserCard;
