import * as React from 'react';

import { WithLoadable } from 'Containers/WithLoadable';

const AsyncAppRouter = WithLoadable(() =>
  import('Containers/Router/AppRouter'),
);

const App = () => <AsyncAppRouter />;

export default App;
