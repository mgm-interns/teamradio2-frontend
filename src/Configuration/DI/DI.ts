import { SongServices, StationServices, UserServices } from 'Services/Http';
import { container, inject } from './container';

// Binding services
container.bind('UserServices').to(UserServices);
container.bind('SongServices').to(SongServices);
container.bind('StationServices').to(StationServices);

/**
 * Export inject decorator.
 *
 * HOW TO USE
 *
 * class CustomComponent extends Component{
 *    @inject('UserServices') private userServices: UserServices
 *
 *    componentDidMount() {
 *       this.userServices.doSomething();
 *    }
 * }
 *
 */
export { inject };
