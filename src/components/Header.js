import { ClayInput } from "@clayui/form";
import { Link } from "react-router-dom";
import { IMAGE_PATH } from "../utils/constants";
import { useLogout } from '../hooks/useLogout'

const Header = ({ value, onChange, showFilter = true, userName }) => {
  const  {logout} = useLogout();
  return (
    <header className="header d-flex justify-content-between py-4 px-6">
      <Link to={`/`}>
        <div className="position-relative">
          <img
            src={`${IMAGE_PATH}logo-full-name-vector_clarity.svg`}
            alt="logo"
          />
        </div>
      </Link>

      <div className="header__right-side">
        <div className="d-flex">
          <ul className="fake-navigation mb-4">
            <li>
              <a href="/">Blog</a>
            </li>
            <li>
              <a href="/">About us</a>
            </li>
            <li>
              <a href="/">Knowledge Base</a>
            </li>
          </ul>

          {userName && (
            <div className="logged-in-user ml-8">
              welcome, {userName}!
              <span className="ml-2">
                <Link onClick={() => logout()} to="/logout">Sign out</Link>
              </span>
            </div>
          )}
        </div>

        {showFilter && (
          <ClayInput
            onChange={onChange}
            placeholder="Type to filter by content recommendation..."
            value={value}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
