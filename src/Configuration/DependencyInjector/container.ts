import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

const container = new Container();
const decorators = getDecorators(container);
const {
  lazyInject,
  lazyInjectNamed,
  lazyInjectTagged,
  lazyMultiInject,
} = decorators;

export {
  container,
  lazyInject,
  lazyInjectNamed,
  lazyInjectTagged,
  lazyMultiInject,
};
