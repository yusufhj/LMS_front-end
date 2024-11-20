import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthedUserContext } from '../../App';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  // console.log(user);
  return (
    <>
      {user ? (
        // signed in user
          <ul>
            <li>Welcome, {user.username}</li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            {/* ROLE BASED NAVBAR */}
            { user.role === 'instructor' ? (
              // instructor navbar
                <li>
                  <Link to="/courses/new">Add Course</Link>
                </li>
              ) : (
                // student navbar
                <li>
                  <Link to="/my-enrollments">My Enrollments</Link>
                </li>
              )
            }

            <li>
              <Link to="" onClick={handleSignout}>
                Sign Out
              </Link>
            </li>
          </ul>
     
      ) : (
        // not signed in
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