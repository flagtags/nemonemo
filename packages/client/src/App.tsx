import React from 'react';
import styled from 'styled-components';
import { CELL_STATE } from './components/LogicPaper/type';
import Cell from './components/LogicPaper/Cell';
import Header from './components/Header';
import getLogic from './api/getLogic';
import './App.css';
import LogicPaper from './components/LogicPaper';
import _ from 'lodash';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  const logic = getLogic();

  return (
    <Container className="nemonemologic">
      <Header title={logic.title} />
      <LogicPaper rowLength={10} colLength={10} solution={logic.solution} />
    </Container>
  );
}

export default App;
