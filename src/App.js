import {BrowserRouter ,Routes , Route} from 'react-router-dom'; // Import Router and Route
// import { Switch, Route } from 'react-router-dom';
import Contributor from './Components/Contributor';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./Components/login";
import './scss/App.scss';

const App = () => {
    // const [contributorType, setContributorType] = useState('');
    // const [pullType, setPullType] = useState('');

    // const handleContributorChange = (selectedContributor) => {
    //     setContributorType(selectedContributor);
    // };

    // const handleTypeChange = (selectedType) => {
    //     setPullType(selectedType);
    // };

    return (
      <BrowserRouter>
        <Routes> {/* Wrap your entire application with the Router */}
          <Route path="/pullgenerator" element={<LoginPage />} />
          <Route path="/contributor" element={<Contributor />} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;
