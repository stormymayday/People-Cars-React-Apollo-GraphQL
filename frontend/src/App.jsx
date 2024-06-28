import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApolloProviderComponent from "./apolloClient";
import TestConnection from "./components/TestConnection";

const App = () => (
    <ApolloProviderComponent>
        <Router>
            <Routes>
                <Route path="/" element={<TestConnection />} />
            </Routes>
        </Router>
    </ApolloProviderComponent>
);

export default App;
