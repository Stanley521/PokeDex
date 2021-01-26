import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { store, persistor } from './redux/configureStore';
import AuthNavigation from './navigation/authNavigation';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

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
