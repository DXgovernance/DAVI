import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GuildsDarkTheme } from 'Components/theme.tsx';
import initializeI18Next from '../src/i18n';
import GlobalStyle from "theme/GlobalTheme";
import { createClient, WagmiConfig } from 'wagmi';
import { getDefaultProvider } from 'ethers';

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

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

const ComponentContainer = ({ children }) => (
  <WagmiConfig client={client}>
    <ThemeProvider theme={GuildsDarkTheme}>
      <HashRouter basename="/">
            {children}
          <GlobalStyle />
        </HashRouter>
    </ThemeProvider>
  </WagmiConfig>
);

export const decorators = [
  Story => (
    <ComponentContainer>
      <Story />
    </ComponentContainer>
  ),
];

