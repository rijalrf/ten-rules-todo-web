import { NavLink } from "react-router-dom";

const MainLayout = ({ children }) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-5">
                <div className="container">
                    <NavLink className="navbar-brand fw-bold" to="/">MurahDev Todo</NavLink>
                    <div className="navbar-nav ms-auto">
                        <NavLink className="nav-link" to="/">Todos</NavLink>
                        <NavLink className="nav-link" to="/about">About Me</NavLink>
                    </div>
                </div>
            </nav>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7">
                        <main>{children}</main>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainLayout;