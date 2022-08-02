import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GuildsDarkTheme } from 'Components/theme';
import initializeI18Next from '../src/i18n';
import GlobalStyle from 'theme/GlobalTheme';
import MultichainProvider from 'contexts/MultichainProvider/index';

initializeI18Next({ debug: false });

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
const ComponentContainer = ({ children }) => (
  <ThemeProvider theme={GuildsDarkTheme}>
    <HashRouter basename="/">
        {children}
        <GlobalStyle />
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

