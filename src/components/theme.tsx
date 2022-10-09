import theme from 'theme/dark.json';
import { mediaWidthTemplates } from 'theme/utils';

// TODO: This is a hack to make the GuildsTheme interface work with DXvote themes.
// Refactor this once we move DXvote into a separate repo.
interface ThemeBase {
  [key: string]: any | any[];
}

export interface GuildsTheme extends ThemeBase {
  colors?: {
    white: string;
    red: string;
    grey: string;
    grey2: string;
    failed: string;
    active: string;

    params: { [key: number]: string };

    text: string;
    primary1: string;
    primary2: string;

    bg1: string;
    bg2: string;
    bg3: string;
    bg4: string;

    border1: string;
    border2: string;
    border3: string;

    syntax: {
      key: string;
      value: string;
      expBlue: string;
      expHover: string;
      expLight: string;
      add: string;
      addLight: string;
      addText: string;
      remove: string;
      removeLight: string;
      removeText: string;
      addStat: string;
      removeStat: string;
    };

    votes: { [key: number]: string };
    votesLight: { [key: number]: string };
  };
  fonts?: {
    body: string;
    heading: string;
    monospace: string;
  };
  fontSizes?: {
    label: string;
    mono: string;
    body: string;
    header1: string;
    header2: string;
  };
  lineHeights?: {
    label: number;
    mono: number;
    body: number;
    header1: number;
    header2: number;
  };
  fontWeights?: {
    regular: number;
    medium: number;
    bold: number;
  };
  radii?: {
    curved: string;
    pill: string;
    rounded: string;
  };
}

export const GuildsDarkTheme: GuildsTheme = {
  ...theme,
  // media queries
  mediaWidth: mediaWidthTemplates,
};
