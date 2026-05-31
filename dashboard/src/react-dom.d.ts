declare module "react-dom/client" {
  export function createRoot(container: Element | DocumentFragment): {
    render(element: React.ReactNode): void;
    unmount(): void;
  };
  export function hydrateRoot(
    container: Element | DocumentFragment,
    initialChildren: React.ReactNode,
  ): {
    render(children: React.ReactNode): void;
    unmount(): void;
  };
}
