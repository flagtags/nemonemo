import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';
import getLogic from './api/getLogic';
import './App.css';
import Account from './pages/account';
import ErrorBoundary from './components/ErrorBoundary';
import List from './pages/list';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  const logic = getLogic();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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

            <Route
              path="/list"
              element={<List />}
            />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
