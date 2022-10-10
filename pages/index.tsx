import type {GetStaticProps} from 'next'
import * as fs from "fs";
import styled from "@emotion/styled";
import PostNavigation from "../src/components/PostNavigation";

interface Props {
  posts: string[];
}

const Home = ({posts}: Props) => {
  return (
    <Container>
      <PostNavigation posts={posts}/>
    </Container>
  )
}

const Container = styled.div`
  width: 1050px;
  margin: 0 auto;
`;

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const postFileNames = fs.readdirSync('./__posts');

  return {
    props: {
      posts: postFileNames.map(fileName => fileName.replace('.md', ''))
    }
  }
}
