import newContext from '../helpers/context';
import reducer from './reducer';

const { StylesProvider, useStylesState, useStylesUpdater } = newContext({
  name: 'Styles',
  initState: {},
  reducer,
});

export { StylesProvider, useStylesState, useStylesUpdater };
