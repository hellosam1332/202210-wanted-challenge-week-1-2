---
categories:
date: '2022-10-10'
description: 원티드 프리온보딩 프론트엔드 챌린지 10월 Week 1-2 과제 블로그 만들기
tags:
title: 원티드 프리온보딩 프론트엔드 챌린지 10월 Week 1-2 과제
---

# Next.js 와 정적 마크업을 사용해서 블로그를 만들어보자

## 개요
Next.js 에서는 정적 페이지를 생성해주는 강력한 `Static Site Generator(SSG)` 기능을 제공한다.

위 기능을 사용하여 `./__post/` 폴더 아래 `markdown` 파일들을 정적페이지로 생성하여 보여주는 서비스를 만들어본다.

## 페이지 구조

### ./pages/index.tsx
markdown 파일 리스트로 클릭할 수 있는 링크를 버튼으로 제공하는 페이지

파일을 읽으려면 `fs` 모듈을 사용해야하고 해당 모듈은 `node.js` 환경의 서버사이드에서 실행된다.

`getStaticProps` 를 사용하여 `./__post/` 폴더 아래 `markdown` 파일들을 읽어 파일명 리스트를 페이지 property 로 내려주고

 해당 페이지에서는 포스트로 이동할 수 있는 버튼과 링크를 렌더링한다.

### ./pages/[id].tsx
`id` 로 매핑되는 `markdown` 을 html 로 파싱하여 렌더링을 수행하는 페이지.

```typescript
// getStaticPaths 를 사용하여  포스트 파일명을 통해 정적페이지를 생성한다
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

```

```typescript
// remark 패키지를 사용하여 플러그인과 조합해 html 파싱 및 코드 하이라이팅 구현
const html = await unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkPrism)
    .use(remarkHtml, {sanitize: false})
    .process(content);
```

## CI/CD
Github actions 와 vercel 을 통해 unit test 와 vercel deploy 까지 간단한 CI/CD 구현

`.github/workflows/vercel-deploy.yml`
