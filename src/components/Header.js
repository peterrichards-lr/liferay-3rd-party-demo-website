import { Link } from "react-router-dom";
import { ClayInput } from "@clayui/form";
import { useQuery } from "../hooks/useQuery";
import { getImagePath } from "../utils/image-path";

const Header = ({ value, onChange, showFilter = true, userName }) => {
  const userId = useQuery("userId");

  return (
    <header className="header d-flex justify-content-between py-4 px-6">
      <Link to={`/home?userId=${userId}`}>
        <div className="position-relative">
          <img
            src={`${getImagePath()}/logo-full-name-vector_clarity.svg`}
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
                <Link to="/login">Sign out</Link>
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
