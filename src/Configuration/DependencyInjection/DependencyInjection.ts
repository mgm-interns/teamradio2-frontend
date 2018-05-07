import { injectable } from 'inversify';
import { container, lazyInject } from './container';

type ServiceClassType = new () => {};
function Service(serviceName: string) {
  return (target: ServiceClassType) => {
    container.bind(serviceName).to(target);
    return injectable()(target);
  };
}

function Inject(target: any) {
  return lazyInject(target);
}

export { Inject, Service };
