import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import {client} from "./components/client"
import { BrowserRouter } from "react-router-dom";
// const client = new ApolloClient({
//   uri:"http://localhost:8080/",
//   cache: new InMemoryCache(),
// });


// // const client = ...

// client
//   .query({
//     query:gql`
//         query{
//           getUser{
//             name
//             id
//             age
//             sex
//           }
//         }
//         `
//   })
  // .then((result) => console.log(result));



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
