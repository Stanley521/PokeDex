import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { useState } from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider, useSelector, useDispatch } from 'react-redux';
import { updateUser } from './redux/actions/userActions';
import { store, persistor } from './redux/configureStore';
import AuthNavigation from './navigation/authNavigation';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

function RootComponent() {
  var user = useSelector(state => state.user?.data)
  const dispatch = useDispatch();

  const [name, setName] = useState('Jessica');
  function updateName() {
    updateUser({ name: name }, dispatch);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          {user.name}
        </div>
        <input value={name} placeholder="User Name" onChange={(e) => {
          setName(e.target.value)
        }} />
        <button onClick={updateName}>Save</button>
      </header>
    </div>
  )
}

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://graphql-pokeapi.vercel.app/api/graphql"
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          {/* <RootComponent /> */}
          <AuthNavigation />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
