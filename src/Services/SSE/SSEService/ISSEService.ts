export interface ISSEService {
  eventSource: EventSource;
  options: IRadioSSEOptions;
  start: () => void;
  close: () => void;
}

export interface IRadioSSEOptions {
  action: string;
  eventKey: string;
  endpoint: string;
  beforeStart?: () => void;
  afterStart?: () => void;
  beforeClose?: () => void;
  afterClose?: () => void;
}
