import { injectable } from 'inversify';
import { container, lazyInject } from './container';

type ServiceClassType = new () => {};
/**
 *
 * Export Service decorator.
 *
 * ********HOW TO USE********
 *
 * @Service
 * class UserService {
 *   // Service declaration
 * }
 */
function Service(serviceName: string) {
  // Register target service to the container
  // Then return original injectable decorator
  return (target: ServiceClassType) => {
    container.bind(serviceName).to(target);
    return injectable()(target)
  };
}

/**
 * Export Inject decorator.
 *
 * ***********************HOW TO USE*****************************
 *
 * class CustomComponent extends Component{
 *    @Inject('UserServices') private userServices: UserServices
 *
 *    componentDidMount() {
 *       this.userServices.doSomething();
 *    }
 * }
 *
 */
function Inject(target: any) {
  return lazyInject(target);
}

export { Inject, Service };
