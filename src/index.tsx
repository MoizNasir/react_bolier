import React, { Suspense } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  concat,
  ApolloProvider,
} from "@apollo/client";
import { render } from "react-dom";

import { APP_ROOT } from "~/config";
import { App } from "./App";

import { Provider } from "react-redux";
import { persistor, store } from "./store/configStore";

import { PersistGate } from "redux-persist/integration/react";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

import "./index.scss";

const rootElement = document.getElementById(APP_ROOT);


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach((error) => {
      if (
        error.message === "jwt expired" ||
        error.message === "invalid signature"
      ) {
        window.location.href = "/";
      } else {
        if (error.extensions.code === "UNAUTHENTICATED") {
          client.clearStore();
          client.cache.reset();
          window.open(`http://localhost:3001`, "_self");
        }
        console.log("Err Response : ", error);
      }
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
const authMiddleware = new ApolloLink((operation, forward) => {
  const token = store.getState().layoutReducer.token;
  operation.setContext({
    headers: { Authorization: token ? `Bearer ${token}` : null },
  });
  return forward(operation);
});
const link = ApolloLink.from([
  errorLink,
  concat(
    authMiddleware,
    createUploadLink({ uri: "https://essp-backend.psps.tekrowe.com/graphql", })//backend link here
  ),
]);
const client = new ApolloClient({ 
  cache: new InMemoryCache(), 
  link: link 
});


function ReactApp(): JSX.Element {
  const token = store?.getState()?.layoutReducer?.token;
  const routeToken = window.location?.search?.includes("token");
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Provider store={store}>
        <PersistGate loading={<div>Gate Loading..</div>} persistor={persistor}>
          {(token || routeToken) ?<ApolloProvider client={client}>
            <App />
          </ApolloProvider>:
          <App />//edit here
          }
        </PersistGate>
      </Provider>
    </Suspense>
  );
}

render(<ReactApp />, rootElement);
