import { createContext, useReducer, useCallback } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const { REACT_APP_GH_API: api, REACT_APP_GH_TOKEN: token } = process.env;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
  };

  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const getUser = useCallback(async (login) => {
    setLoading();

    const response = await fetch(`${api}/users/${login}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    if (response.status !== 200) {
      window.location = '/notfound';
      return;
    }

    const data = await response.json();
    dispatch({
      type: 'GET_USER',
      payload: data,
    });
  }, []);

  const searchUsers = useCallback(async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${api}/search/users?${params}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    const { items } = await response.json();
    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  }, []);

  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS',
    });
  };

  return (
    <GithubContext.Provider
      value={{
        ...state,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
