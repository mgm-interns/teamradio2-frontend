import { IApplicationState } from 'Configuration/Redux/Reducers';
import { Store } from 'redux';
import { IRadioSSE, IRadioSSEOptions } from './IRadioSSE';

export default class RadioSSE implements IRadioSSE {
  public eventSource: EventSource;
  public options: IRadioSSEOptions;

  private store: Store<IApplicationState>;

  constructor(store: Store<IApplicationState>, options: IRadioSSEOptions) {
    this.store = store;
    this.options = options;
  }

  public getTypeConnected() {
    return `${this.options.action}_CONNECTED`;
  }

  public getTypeError() {
    return `${this.options.action}_ERROR`;
  }

  public getTypeUpdated() {
    return `${this.options.action}_UPDATED`;
  }

  public start() {
    //
    this.beforeStart();

    /**
     * Initial EventSource instance
     */
    this.eventSource = new EventSource(this.options.endpoint);

    // Bind listener
    this.eventSource.addEventListener(
      this.options.eventKey,
      this.onReceivedEvent,
    );

    //
    this.afterStart();
  }

  public close() {
    //
    this.beforeClose();

    /**
     * Close EventSource connection
     */
    this.eventSource.close();

    //
    this.afterClose();
  }

  protected onReceivedEvent(event: MessageEvent) {
    //
    this.store.dispatch({
      type: this.getTypeUpdated(),
      payload: JSON.parse(event.data),
    });
  }

  protected beforeStart() {
    //
    if (this.options.beforeStart) this.options.beforeStart();
  }

  protected afterStart() {
    //
    if (this.options.afterStart) this.options.afterStart();

    this.eventSource.onopen = () => {
      this.store.dispatch({
        type: this.getTypeConnected(),
      });
    };

    this.eventSource.onerror = () => {
      this.store.dispatch({
        type: this.getTypeError(),
      });
    };
  }

  protected beforeClose() {
    //
    if (this.options.beforeClose) this.options.beforeClose();
  }

  protected afterClose() {
    //
    if (this.options.afterClose) this.options.afterClose();
  }
}
