import React from 'react';
import { Grommet, Main, ThemeType } from 'grommet';
import { configureStore } from './state/store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Redirect, Route, Switch } from 'react-router';
import Settings from './components/screens/Settings';
import Menu from './components/screens/Menu';
import LevelSelection from './components/screens/LevelSelection';
import Level from './components/screens/Level';
import theme from './theme';


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
