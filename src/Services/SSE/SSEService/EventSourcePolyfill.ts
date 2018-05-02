import { IHeader } from 'Services/Header';

export interface IEventSourcePolyfill extends EventSource {
  new (endpoint: string, options: IEventSourcePolyfillOptions): EventSource;
}

export interface IEventSourcePolyfillOptions {
  headers: IHeader;
}
