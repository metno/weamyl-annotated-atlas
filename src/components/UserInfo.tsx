import { useAuth } from 'react-oidc-context';
import React from 'react';

const UserInfo: React.FC = () => {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return (
      <ul>
        <li>Name: {auth.user?.profile.name}</li>
      {//  <li>Username: {auth.user?.profile.preferred_username}</li> 
      }
        <li>Email: {auth.user?.profile.email}</li>
      </ul>
    );
  }

  return <div>Not logged in</div>;
};

export default UserInfo;