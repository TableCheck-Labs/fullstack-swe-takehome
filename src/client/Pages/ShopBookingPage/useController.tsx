import { useMenu, useShop } from "../../App";
import { PartySizeList } from "../../Components/PartySizeList";
import { useMutableState } from "../../utils/useMutableState";
import getter from "../../utils/getter";
import { PartySize } from "./PartySize";

type Controller = {
  title: string;
  isCTAOpen: boolean;
  openCTA(): void;
  closeCTA(): void;
  renderModal(): JSX.Element;
};

export function useController(): Controller {
  const shop = useShop();
  const menu = useMenu();
  const [state, setState] = useMutableState({
    isCTAOpen: false,
    partySize: new PartySize(shop.config, menu.items),
  });
  
  const title = getter(shop, "config.slug", "");
  const api: Controller = {
    ...state,
    title: `welcome to ${title}`,
    openCTA() {
      setState((d) => {
        d.isCTAOpen = true;
      });
    },
    closeCTA() {
      setState((d) => {
        d.isCTAOpen = false;
      });
    },
    renderModal: () => {
      return (
        <dialog open={state.isCTAOpen} data-testid="Party Size Modal">
          <PartySizeList partySize={state.partySize} />

          <button onClick={api.closeCTA}>close</button>
        </dialog>
      );
    },
  };

  return api;
}
