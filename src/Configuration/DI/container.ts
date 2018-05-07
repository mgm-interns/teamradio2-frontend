import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

const container = new Container();
const decorators = getDecorators(container);
const inject = decorators.lazyInject;

export { container, inject };
