import styled from 'styled-components';

interface IPopup {
  close: () => void;
  children: React.ReactNode;
  isOpen: boolean;
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

const Popup = ({ close, children, isOpen }: IPopup) => {
  if (!isOpen) return null;

  return (
    <Background onClick={() => close()}>
      <Container
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
      >
        {children}
      </Container>
    </Background>
  );
};

export default Popup;
