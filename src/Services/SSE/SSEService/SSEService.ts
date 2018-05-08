import { getStore } from 'Configuration/Redux/index';
import { IApplicationState } from 'Configuration/Redux/Reducers';
import 'event-source-polyfill/src/eventsource';
import { localStorageManager } from 'Helpers';
import { Store } from 'redux';
import { createHeaders } from 'Services/Header';
import {
  IEventSourcePolyfill,
  IEventSourcePolyfillOptions,
} from './EventSourcePolyfill';
import { IRadioSSEOptions, ISSEService } from './ISSEService';

declare var EventSourcePolyfill: IEventSourcePolyfill;

export default class SSEService implements ISSEService {
  public eventSource: EventSource;
  public eventSourceOptions: IEventSourcePolyfillOptions;
  public options: IRadioSSEOptions;

  private store: Store<IApplicationState>;

  constructor(options: IRadioSSEOptions) {
    this.store = getStore();
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

  public getTypeClosed() {
    return `${this.options.action}_CLOSED`;
  }

  public start() {
    //
    this.beforeStart();

    /**
     * Initial EventSource instance
     */
    this.eventSource = new EventSourcePolyfill(
      this.options.endpoint,
      this.eventSourceOptions,
    );

    // Bind listener
    this.eventSource.addEventListener(
      this.options.eventKey,
      this.onReceivedEvent.bind(this),
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

    // Read access token and append to headers
    const accessToken = localStorageManager.getAccessToken();

    this.eventSourceOptions = {
      headers: createHeaders(accessToken),
    };
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

    this.store.dispatch({
      type: this.getTypeClosed(),
    });
  }
}
