import styled from 'styled-components';
import { useState } from 'react';

const Button = styled.button`
  font-size: 1.8rem;
  margin: 2.5px;
`;

export default ({ hint }: { hint: number }) => {
  const [hintNumberChecked, setHintNumberChecked] = useState(false);

  return (
    <Button
      role={'hint_button'}
      onClick={() => setHintNumberChecked(!hintNumberChecked)}
      style={ hintNumberChecked? { color: 'blue', textDecoration:'line-through'} :{}}
    >
      {hint}
    </Button>
  )
}
