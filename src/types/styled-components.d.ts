import { GuildsTheme } from "components/theme"

// Override the styled components default theme
declare module 'styled-components' {
  export interface DefaultTheme extends GuildsTheme {}
}