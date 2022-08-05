import { Component, ComponentProps } from '@core/component';

export class ComponentWithOverlay extends Component {
  private overlay: Component | null;

  constructor(props: ComponentProps) {
    super(props);

    this.overlay = null;
  }

  protected afterRender(): void {
    super.afterRender();

    const overlay = this.getComponent('overlay');
    if (!Array.isArray(overlay)) {
      this.overlay = overlay;
    }
  }

  protected showOverlay = () => {
    if (this.overlay !== null) {
      this.overlay.getRoot().classList.add('loading-overlay_show');
      this.getRoot().style.pointerEvents = 'none';
    }
  }

  protected hideOverlay = () => {
    if (this.overlay !== null) {
      this.overlay.getRoot().classList.remove('loading-overlay_show');
      this.getRoot().style.pointerEvents = 'all';
    }
  }

}