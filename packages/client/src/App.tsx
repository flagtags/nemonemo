import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';
import getLogic from './api/getLogic';
import './App.css';
import Account from './pages/account';
import ErrorBoundary from './components/ErrorBoundary';
import List from './pages/list';
import Game from './pages/game';
import { Redirect } from './components/Redirect';
import LogicFactory from './pages/logic/factory';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  const logic = getLogic();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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

          {/*  */}

          <Route
            path="/game/:logicId"
            element={
              <ErrorBoundary fallback={<Redirect path="/" />}>
                <Suspense fallback="loading 중...">
                  <Game />
                </Suspense>
              </ErrorBoundary>
            }
          />

          <Route
            path="/list"
            element={
              <ErrorBoundary fallback={<Redirect path="/account" />}>
                <Suspense fallback="loading 중...">
                  <List />
                </Suspense>
              </ErrorBoundary>
            }
          />

          <Route
            path="/logic/factory"
            element={
              <ErrorBoundary fallback={<Redirect path="/list" />}>
                <Suspense fallback="loading 중...">
                  <LogicFactory />
                </Suspense>
              </ErrorBoundary>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
