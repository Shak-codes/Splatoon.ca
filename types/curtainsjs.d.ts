declare module "curtainsjs" {
  // Minimal types needed for this component. Everything else is typed as any.
  export class Curtains {
    constructor(params?: any);
    dispose(): void;
    nextRender?(): void;
    onRender(callback: () => void): void;
    canvas?: HTMLCanvasElement;
  }

  export class Plane {
    constructor(curtains: Curtains, element: HTMLElement, params?: any);
    onReady(callback: () => void): void;
    onRender(callback: () => void): void;
    onAfterResize(callback: () => void): void;
    onError(callback: () => void): void;
    remove(): void;
    uniforms?: Record<string, { value: any }>;
  }
}
