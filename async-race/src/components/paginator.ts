import { EVENT, ITEMS_PER_PAGE } from "@common/constants";
import { Component, ComponentProps } from "@core/component";
import { PaginatorView } from "@views/paginator";
import { Button } from "./button";

type PaginatorProps = ComponentProps & {
  data: {
    pageNumber: number;
    pageName: string;
    amount: number;
  }
};

export class Paginator extends Component {
  private pageNumber: number;
  private maxPage: number;
  private eventName: keyof typeof EVENT;
  public buttons: Record<string, Button>;
  
  constructor(props: PaginatorProps) {
    super({
      ...props,
      viewConstructor: PaginatorView,
    });
    
    const { data } = props;
    const pageName = data.pageName.toUpperCase() as keyof typeof ITEMS_PER_PAGE;
    this.pageNumber = data.pageNumber;
    this.maxPage = Math.ceil(data.amount / ITEMS_PER_PAGE[pageName]);
    this.eventName = `${pageName}_CHANGE_PAGE` as keyof typeof EVENT;
    this.buttons = {};

    this.on(EVENT.START_RACE, this.handleStartRace);
    this.on(EVENT.RACE_END, this.handleEndRace);
  }

  protected render(): string {
    const { handleNextClick, handlePrevClick, pageNumber, maxPage } = this;
    return super.render({
      prevHandler: handlePrevClick,
      nextHandler: handleNextClick,
      pageNumber,
      maxPage,
      prevClasses: this.pageNumber === 1 ? 'button_disabled' : '',
      nextClasses: this.pageNumber === this.maxPage ? 'button_disabled' : '',
    })  
  }

  protected afterRender(): void {
    super.afterRender();

    ['next', 'prev'].forEach((name) => {
      const btn = this.getComponent(name);
      if (!Array.isArray(btn) && btn instanceof Button)
        this.buttons[name] = btn;
    });
  }

  private updateButtons() {
    const prevBtnState = this.pageNumber === 1 ? 'disable' : 'enable';
    this.buttons['prev'][prevBtnState]();
    const nextBtnState = this.pageNumber === this.maxPage ? 'disable' : 'enable';
    this.buttons['next'][nextBtnState]();
  }

  private handleNextClick = () => {
    this.pageNumber += 1;
    if (this.pageNumber > this.maxPage) {
      this.pageNumber = this.maxPage;
    }
    this.emit(EVENT[this.eventName], { pageNumber: this.pageNumber });
  }

  private handlePrevClick = () => {
    this.pageNumber -= 1;
    if (this.pageNumber === 0) {
      this.pageNumber = 1;
    }
    this.emit(EVENT[this.eventName], { pageNumber: this.pageNumber });
  }

  private setButtons = (state: 'enable' | 'disable') => {
    this.buttons['next'][state]();
    this.buttons['prev'][state]();
  }

  private handleStartRace = () => {
    this.setButtons('disable')
  }

  private handleEndRace = () => {
    this.setButtons('enable');
    this.updateButtons();
  }
}