import { ConnectedRouter } from 'connected-react-router';
import { Grommet, Main, ThemeType } from 'grommet';
import React from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import theme from '../theme';
import { configureStore } from '../state';
import Level from './screens/Level';
import LevelSelection from './screens/LevelSelection';
import Menu from './screens/Menu';
import Settings from './screens/Settings';


const { store, history } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Grommet full theme={theme as ThemeType}>
          <Main align="center">
            <Switch>
              <Route exact path="/" component={Menu}/>
              <Route exact path="/settings" component={Settings}/>
              <Route exact path="/select-level" component={LevelSelection}/>
              <Route exact path="/level/:level" component={Level}/>
              <Route render={() => <Redirect to="/"/>}/>
            </Switch>
          </Main>
        </Grommet>
      </ConnectedRouter>
    </Provider>
  );
}


export default App;
