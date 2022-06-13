import { css } from 'styled-components';

export const SUPPORTED_THEMES = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
};

const MEDIA_WIDTHS = {
  upToSmall: 600,
  upToMedium: 960,
  upToLarge: 1280,
};

export const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    accumulator[size] = (...args: any[]) => css`
      @media (max-width: ${MEDIA_WIDTHS[size]}px) {
        ${
          // @ts-ignore
          css(...args)
        }
      }
    `;
    return accumulator;
  },
  {}
);
