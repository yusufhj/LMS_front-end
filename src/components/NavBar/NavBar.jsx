import { Link } from 'react-router-dom';
import { useContext } from 'react';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      {user ? (
        
          <ul>
            <li>Welcome, {user.username}</li>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to='/courses'>courses</Link>
            </li>
            <li>
              <Link to='/courses/new'>NEW COURSE</Link>
            </li>
            <li>
              <Link to="" onClick={handleSignout}>
                Sign Out
              </Link>
            </li>
          </ul>
     
      ) : (
          <ul>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
      )}
    </>
  );
};
export default NavBar;