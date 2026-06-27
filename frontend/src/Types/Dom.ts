export interface DOMConfig {
  rootSelector: string;
  errorMessage?: string;
}

export const createDOMRoot = (config: DOMConfig): HTMLDivElement => {
  const element = document.querySelector<HTMLDivElement>(config.rootSelector);

  if (!element) {
    throw new Error(
      config.errorMessage || `Element "${config.rootSelector}" not found`
    );
  }

  return element;
};