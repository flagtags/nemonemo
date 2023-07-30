import styled from 'styled-components';

interface IPopup {
  close: () => void;
  children: React.ReactNode;
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  background-color: white;
`;

const Popup = ({ close, children }: IPopup) => {
  return (
    <Background onClick={() => close()}>
      <Container>{children}</Container>
    </Background>
  );
};

export default Popup;
