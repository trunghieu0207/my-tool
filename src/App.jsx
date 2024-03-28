import {Route} from "react-router-dom";
import AppRoutes from "./AppRoutes.jsx";
import {PageBase64} from "./page/PageBase64.jsx";
import {PageGenerateString} from "./page/PageGenerateString.jsx";


const App = () => {
    return (
        <AppRoutes>
            <Route path="/" element={<PageBase64 />}></Route>
            <Route path="/base64" element={<PageBase64 />}></Route>
            <Route path="/random" element={<PageGenerateString />}></Route>
        </AppRoutes>
    );
};

export default App;