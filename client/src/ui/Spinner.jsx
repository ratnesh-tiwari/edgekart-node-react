import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const StyledSpinner = styled.div`
  margin: 4.8rem auto;

  width: 6.4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, var(--color-brand-600) 95%, #0000) top/10px
      10px no-repeat,
    conic-gradient(#0000 45%, var(--color-brand-600));
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  animation: ${rotate} 2s infinite linear;
`;

const StyledDivSpinner = styled.div`
  background-color: var(--color-grey-50);
  width: 100%;
  height: 100dvh;
  display: grid;
  place-content: center;
`;
function Spinner() {
  return (
    <StyledDivSpinner>
      <StyledSpinner />
    </StyledDivSpinner>
  );
}

export default Spinner;
