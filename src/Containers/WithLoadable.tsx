import * as React from 'react';

import Loadable from 'react-loadable';

export const WithLoadable = (loader: any) =>
  Loadable({
    loader,
    loading: () => <div>Loading...</div>,
  });
