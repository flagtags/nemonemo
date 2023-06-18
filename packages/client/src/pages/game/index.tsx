import styled from 'styled-components';
import getLogic from '../../api/getLogic';
import Header from '../../components/Header';
import LogicPaper from '../../components/LogicPaper';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  const logic = getLogic();

  return (
    <Container className="nemonemologic">
      <Header title={logic.title} />
      <LogicPaper
        rowLength={10}
        colLength={10}
        solution={logic.solution}
      />
    </Container>
  );
}

export default App;
