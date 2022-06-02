import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GuildsDarkTheme } from 'Components/theme';
import initializeI18Next from '../src/i18n';
import GlobalStyle from 'theme/GlobalTheme';
import MultichainProvider from 'contexts/MultichainProvider/index';

initializeI18Next();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
initializeI18Next();
const ComponentContainer = ({ children }) => (
  <ThemeProvider theme={GuildsDarkTheme}>
    <HashRouter basename="/">
      <MultichainProvider>
        {children}
        <GlobalStyle />
      </MultichainProvider>
    </HashRouter>
  </ThemeProvider>
);

export const decorators = [
  Story => (
    <ComponentContainer>
      <Story />
    </ComponentContainer>
  ),
];

