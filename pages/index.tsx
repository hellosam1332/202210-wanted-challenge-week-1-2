import type {GetStaticProps} from 'next'
import * as fs from "fs";
import Link from 'next/link';

interface Props {
  posts: string[];
}

const Home = ({posts}: Props) => {
  return (
    <div>
      <nav>
        <ul>
          {posts.map((post) =>
            <li key={post}>
              <Link href={`/${post}`}>{post}</Link>
            </li>)
          }
        </ul>
      </nav>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const postFileNames = fs.readdirSync('./__posts');

  return {
    props: {
      posts: postFileNames.map(fileName => fileName.replace('.md', ''))
    }
  }
}
