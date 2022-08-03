import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './Navigation.module.css';

const Navigation = () => {

  const context = useContext(AuthContext); // pass the context you want to use inside the useContext hook
  
  return (
          <nav className={classes.nav}>
          <ul>
            {context.isLoggedIn && ( // accessing the isLoggedIn set in the context creation
              <li>
                <a href="/">Users</a>
              </li>
            )}
            {context.isLoggedIn && (
              <li>
                <a href="/">Admin</a>
              </li>
            )}
            {context.isLoggedIn && (
              <li>
                <button onClick={context.onLogout}>Logout</button>
              </li>
            )}
          </ul>
          </nav>      
  );
};

export default Navigation;
