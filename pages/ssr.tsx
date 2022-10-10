import styled from '@emotion/styled';
import {GetServerSideProps} from "next";

const Container = styled.div``;

interface Props {
  time: string;
}

export default function Ssr({time}: Props) {
  return (
    <Container>
      <h1>SSR with cache-control</h1>
      <h2>Time: {time}</h2>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({res}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  return {
    props: {
      time: new Date().toISOString(),
    }
  }
}
