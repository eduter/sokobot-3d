import { ConnectedRouter } from 'connected-react-router';
import { Grommet, Main, ThemeType } from 'grommet';
import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import theme from '../theme';
import { configureStore } from '../state';
import Menu from './screens/Menu';

const Level = lazy(() => import('./screens/Level'));
const LevelSelection = lazy(() => import('./screens/LevelSelection'));
const Settings = lazy(() => import('./screens/Settings'));


const { store, history } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Grommet full theme={theme as ThemeType}>
          <Main align="center">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={Menu}/>
                <Route exact path="/settings" component={Settings}/>
                <Route exact path="/select-level" component={LevelSelection}/>
                <Route exact path="/level/:level" component={Level}/>
                <Route render={() => <Redirect to="/"/>}/>
              </Switch>
            </Suspense>
          </Main>
        </Grommet>
      </ConnectedRouter>
    </Provider>
  );
}


export default App;
