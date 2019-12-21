import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import normalize from 'styled-normalize';
import { StylesProvider } from '@material-ui/styles';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
${normalize}
body {
  font-family: Helvetica, Sans-Serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
`;

ReactDOM.render(
    <StylesProvider injectFirst>
        <GlobalStyles />
        <App />
    </StylesProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
