import { useAuth } from "~/services/useAuth";
import { Alert, Auth, NavBar, Page } from "./Components";

interface Props {
  title: React.ReactNode;
  content: React.ReactNode;
}

export function App({ title, content }: Props) {
  const auth = useAuth();

  return (
    <Page>
      {auth[0].isError && <Alert type="error">{auth[0].error?.message}</Alert>}
      <Auth auth={auth} />
      <NavBar title={title} auth={auth} />
      {content}
    </Page>
  );
}
