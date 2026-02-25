import { colors, Colors } from "./colors";
import { typography, Typography } from "./typography";
import { spacing, Spacing } from "./spacing";
import { components, Components } from "./components";

export interface Theme {
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
  components: Components;
}

export const theme: Theme = {
  colors,
  typography,
  spacing,
  components,
};

export type ThemeColor = keyof Theme["colors"];
