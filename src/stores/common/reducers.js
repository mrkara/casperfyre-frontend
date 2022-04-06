import { combineReducers } from 'redux';
import { createReducer } from '../../shared/core/services/redux';
import { Highway } from 'shared/models/Highway';

const initialFavoriteState = {
  favorites: []
}

const addFavorite = (state, payload) => {
  const checkExisted = state.favorites.find(x => x.id === payload.id);
  if (!checkExisted) {
    state.favorites.push(new Highway(payload));
  }
  return {
    ...state,
    favorites: [...state.favorites],
  }
};

const favoriteStrategies = {
  ADD_FAVORITE: addFavorite,
  __default__: (state) => state,
};
const favoriteController = createReducer(favoriteStrategies, {
  ...initialFavoriteState,
});

/* commonReducer */
export const commonReducer = combineReducers({
  favoriteController,
});
