import axios from 'axios';
const { REACT_APP_GH_API: api, REACT_APP_GH_TOKEN: token } = process.env;

const githubApi = axios.create({
  baseURL: api,
  headers: {
    Authorization: `token ${token}`,
  },
});

export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await githubApi.get(`/search/users?${params}`);
  return response.data.items;
};

export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    githubApi.get(`/users/${login}`),
    githubApi.get(`/users/${login}/repos`),
  ]);

  return {
    user: user.data,
    repos: repos.data,
  };
};
