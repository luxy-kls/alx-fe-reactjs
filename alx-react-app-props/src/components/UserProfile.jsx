import React, { useContext } from 'react';
import UserContext from './components/UserContext';


function UserProfile() {
    const userData =useContext(UserContext);
    
    return(
        <>
        <h2>{userData.name}</h2>
        <p>Age: {userData.age}</p>
        <p>Bio: {userData.bio}</p>
        </>
    );
};

export default UserProfile;