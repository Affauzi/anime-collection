import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 80px auto 0px auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 120px;

  @media (max-width: 768px) {
    max-width: 90%; 

  
  @media (max-width: 1024px) {
    max-width: 80%; 
  }
`;
