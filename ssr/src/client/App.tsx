import { ContextWrapper } from "./Context";

export const App = ({ title }: { title: string }) => {
  return (
    <ContextWrapper>
      <h1>{title || "page"}</h1>
    </ContextWrapper>
  );
};

export default App;
