import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApolloProviderComponent from "./apolloClient";
// import TestConnection from "./components/TestConnection";
import HomePage from "./components/HomePage";
import PersonDetail from "./components/PersonDetail";

const App = () => (
    <ApolloProviderComponent>
        <Router>
            <Routes>
                {/* <Route path="/" element={<TestConnection />} /> */}
                <Route path="/" element={<HomePage />} />
                <Route path="/people/:id" element={<PersonDetail />} />
            </Routes>
        </Router>
    </ApolloProviderComponent>
);

export default App;
