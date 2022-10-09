interface Props {
  html: string;
}

export default function MarkDownView({html}: Props) {
  return (
    <div dangerouslySetInnerHTML={{__html: html}}/>
  );
}
