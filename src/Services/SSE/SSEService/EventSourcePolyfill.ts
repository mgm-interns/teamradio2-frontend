import { IHeader } from 'Services/Helpers';

export interface IEventSourcePolyfill extends EventSource {
  new (endpoint: string, options: IEventSourcePolyfillOptions): EventSource;
}

export interface IEventSourcePolyfillOptions {
  headers: IHeader;
}
