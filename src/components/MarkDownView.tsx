import styled from "@emotion/styled";

interface Props {
  html: string;
}

export default function MarkDownView({html}: Props) {
  return (
    <Container dangerouslySetInnerHTML={{__html: html}}/>
  );
}

const Container = styled.div`
  width: 1050px;
  margin: 0 auto;
`;
