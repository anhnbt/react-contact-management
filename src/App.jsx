import { BrowserRouter, Route, Routes } from 'react-router';
import ContactListPage from './pages/ContactListPage';
import ContactCreatePage from './pages/ContactCreatePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactEditPage from './pages/ContactEditPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactListPage />} />
        <Route path="/contacts/create" element={<ContactCreatePage />} />
        <Route path="/contacts/edit/:contactId" element={<ContactEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
