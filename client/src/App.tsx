import { Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ResultsPage from './pages/ResultsPage';
import RecipesPage from './pages/RecipesPage';
import AddRecipePage from './pages/AddRecipePage';

function App() {
  return (
    <div>
      <h1>Recomposicion App</h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipes/add" element={<AddRecipePage />} />
      </Routes>
    </div>
  );
}

export default App;