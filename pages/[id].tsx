import {GetStaticPaths, GetStaticProps} from "next";
import fs from "fs";
import path from "path";

import {unified} from 'unified'
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

import matter from 'gray-matter';
import MarkDownView from "../src/components/MarkDownView";

interface Props {
  data: string;
}

const PostPage = ({data}: Props) => {
  return (
    <MarkDownView html={data}/>
  )
}

export default PostPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const {params} = context;

  const {id} = params as { id: string; };

  const post = fs.readFileSync(path.join(`__posts/${id}.md`));
  const {data, content} = matter(post);
  const html = await unified().use(remarkParse).use(remarkHtml).process(content);

  return {
    props: {
      data: html.value,
    }
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const postFileNames = fs.readdirSync(path.join('__posts'));

  const paths = postFileNames.map(fileName => ({
    params: {
      id: fileName.replace('.md', '')
    }
  }))

  return {
    paths,
    fallback: false,
  }
}

