import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import getLogic from './api/getLogic';
import './App.css';
import Login from './components/Account/Login';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  const logic = getLogic();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<></>}
        />

        <Route
          path="/account"
          element={<Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
