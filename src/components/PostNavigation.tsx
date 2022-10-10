import styled from '@emotion/styled';
import Link from "next/link";

interface Props {
  posts: string[];
}

export default function PostNavigation({posts}: Props) {
  return (
    <nav>
      <h2>Posts: </h2>
      <ul>
        {posts.map((post) =>
          <Li key={post}>
            <Link href={`/${post}`}>{post}</Link>
          </Li>)
        }
      </ul>
    </nav>
  );
}

const Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 400px;
  width: fit-content;
  height: 50px;
  border: #333 1px solid;
  border-radius: 20px;
  list-style: none;
  margin-bottom: 30px;
`;
