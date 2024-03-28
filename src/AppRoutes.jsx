import {HashRouter, Outlet, Route, Routes} from "react-router-dom";
import Root from "./Root.jsx";


const AppRoutes = ({ children }) => {
    return (
        <HashRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Root>
                            <Outlet />
                        </Root>
                    }
                >
                    {children}
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default AppRoutes;