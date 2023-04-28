import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import getLogic from './api/getLogic';
import './App.css';
import Account from './pages/account';
import ErrorBoundary from './components/ErrorBoundary';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  const logic = getLogic();

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<></>}
          />

          <Route
            path="/account"
            element={<Account />}
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
