import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 80px auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: 90%; 

  
  @media (max-width: 1024px) {
    max-width: 80%; 
  }
`;
