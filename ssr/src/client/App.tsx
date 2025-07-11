import { useAuth, User } from "~/services/useAuth";

import { NavBarContent } from "~/client/Components/NavBarContent";
import { useMenu } from "~/services/useMenu";
import { Alert, Auth, NavBar, Page } from "./Components";

interface Props {
  title: React.ReactNode;
  content: React.ReactNode;
  user: User;
}

export function App({ title, content, user }: Props) {
  const auth = useAuth(user);
  const menu = useMenu();

  return (
    <Page>
      {auth[0].isError && <Alert type="error">{auth[0].error?.message}</Alert>}
      <Auth auth={auth} />
      <NavBar title={title} menu={menu}>
        <NavBarContent auth={auth} menu={menu} />
      </NavBar>
      {content}
    </Page>
  );
}
