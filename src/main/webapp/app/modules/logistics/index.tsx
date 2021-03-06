import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Import from './impport/import';
import Export from './export/export';
import Checking from './checking/checking';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/import`} component={Import} />
      <ErrorBoundaryRoute path={`${match.url}/export`} component={Export} />
      <ErrorBoundaryRoute path={`${match.url}/checking`} component={Checking} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
