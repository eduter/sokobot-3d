import React from 'react';
import { Main } from 'grommet';
import { configureStore } from './state/store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import Settings from './components/screens/Settings';
import Menu from './components/screens/Menu';


const { store, history } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Main align="center">
          <Switch>
            <Route exact path="/" component={Menu}/>
            <Route exact path="/settings" component={Settings}/>
          </Switch>
        </Main>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
