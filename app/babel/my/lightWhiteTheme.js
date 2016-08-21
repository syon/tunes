import {
  grey600,
  pinkA100, pinkA200, pinkA400,
  fullWhite,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
  spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#fff',
    primary2Color: '#69c3ef',
    primary3Color: grey600,
    accent1Color: pinkA200,
    accent2Color: pinkA400,
    accent3Color: pinkA100,
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  },
  appBar: {
    textColor: '#666',
  },
  floatingActionButton: {
    color: '#69c3ef',
  },
  slider: {
    trackColorSelected: grey600,
    selectionColor: '#69c3ef',
    rippleColor: '#69c3ef',
  },
  drawer: {
    color: '#fff',
  },
  subheader: {
    color: '#ccc',
  },
};
