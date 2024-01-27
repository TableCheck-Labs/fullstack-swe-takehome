import xssFilters from "xss-filters";

export class PreloadedDataHydrator {

  chunk(state: unknown, id): string[] {
    const json = JSON.stringify(state);
    const htmlSafe = json.replace(/&/gi, "&amp;");
    const filtered = xssFilters.inSingleQuotedAttr(htmlSafe);
    const chunks = filtered.match(/.{1,500000}/g);
    return (chunks as string[]).map(
      (chunk) =>
        `<input data-preloaded="${id}" style='display: none;' value='${chunk}' />`
    );
  }

  hydrate<TPreloaded>(id): TPreloaded {
    if (typeof window === "undefined" || typeof document === "undefined") {
      throw new Error(
        "hydration should only be performed on the client as it requires the DOM to be loaded"
      );
    }

    let preloadedState = {} as TPreloaded;

    const stateInputs = document.querySelectorAll(
      `input[data-preloaded="${id}"]`
    );
    const joinedStateString = Array.from(stateInputs)
      .map((el) => (el as HTMLInputElement).value)
      .join("");

    if (stateInputs.length) {
      try {
        preloadedState = JSON.parse(joinedStateString);
      } catch (err) {
        console.error("malformed json, could not rehydrate store");
      }

      try {
        Array.from(stateInputs).forEach((el) => el && el.remove());
      } catch (e) {
        console.error("could not remove hidden preloaded state inputs");
      }
    }

    return preloadedState;
  }
}

export const context = new PreloadedDataHydrator();
