import lastfm from 'reducers/lastfm';
import panels from 'reducers/panels';
import transition from 'reducers/transition';
import { reducer as reducerForm } from 'redux-form';

const reducers={
  lastfm,
  panels,
  transition,

  form: reducerForm,
};

export default reducers;