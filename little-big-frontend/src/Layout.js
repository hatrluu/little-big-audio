import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="navbar-item">
                <Link to="/" className="navbar-link">Home</Link>
              </li>
              <li className="navbar-item">
                <Link to="/about" className="navbar-link">About</Link>
              </li>
            </ul>
        </div>
      </nav>

      <div className="container-fluid mt-4">
        <Outlet />
      </div>
    </>
  )
};

export default Layout;
