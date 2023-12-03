'use client';

import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ENDPOINT } from '../../config';

interface ApolloContextProps {
  children: React.ReactNode;
}

export function ApolloContextProvider({ children }: ApolloContextProps) {
  const apolloClient = new ApolloClient({
    uri: ENDPOINT,
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
