import {GetStaticPaths, GetStaticProps} from "next";
import fs from "fs";
import path from "path";

import {unified} from 'unified'
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import remarkStringify from 'remark-stringify';
import remarkPrism from "remark-prism";

import matter from 'gray-matter';
import MarkDownView from "../src/components/MarkDownView";
import Head from "next/head";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

interface Props {
  data: string;
  meta: {
    title: string;
    date: string;
    description: string;
  }
}

const PostPage = ({data, meta}: Props) => {
  const {title} = meta;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <MarkDownView html={data}/>
    </>
  )
}

export default PostPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const {params} = context;

  const {id} = params as { id: string; };

  const post = fs.readFileSync(path.join(`__posts/${id}.md`));
  const {data, content} = matter(post);
  console.info(data)
  const html = await unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkPrism)
    .use(remarkHtml, {sanitize: false})
    .process(content);

  return {
    props: {
      data: html.value,
      meta: {
        title: data.title || 'Blog post page',
        date: data.date || '',
        description: data.description || '',
      }
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

