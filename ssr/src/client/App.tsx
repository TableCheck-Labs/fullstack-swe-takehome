import { Page } from "./Components";

interface Props {
  title: React.ReactNode;
  content: React.ReactNode;
}

export function App({ title, content }: Props) {
  return (
    <Page>
      {title}
      {content}
    </Page>
  );
}
