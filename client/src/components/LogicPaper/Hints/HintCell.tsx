import styled from 'styled-components';
import { IFlexDirection } from '../type';
import HintNumberButton from './HintNumberButton';

const Th = styled.th`
  background-color: lightgrey;
  border: 2px solid black;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const HintCell = ({ direction, hints, role }: { direction: IFlexDirection; hints: number[]; role: string }) => {
  const verticalAlign = direction === 'row' ? 'middle' : 'bottom';

  return (
    <Th role={role} style={{ verticalAlign }}>
      <Div  style={{ flexDirection: direction }}>
        {hints.map((hint: number, index) => (
          <HintNumberButton key={index} hint={hint}/>
        ))}
      </Div>
    </Th>
  );
};

export default HintCell;
