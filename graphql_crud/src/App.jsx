import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import Root from './Root';
import './App.css';

const client = new ApolloClient({
  uri: 'http://test.recruit.croquis.com:28500',
  headers: {
    'Croquis-UUID': '7a3121d9-c3e6-45d9-bd57-a1e8b007bf53',
  },
});

const App = () => (
  <div className="App">
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </ApolloProvider>
  </div>
);

export default App;
