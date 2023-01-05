const { REACT_APP_GH_API: api, REACT_APP_GH_TOKEN: token } = process.env;

export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await fetch(`${api}/search/users?${params}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  const { items } = await response.json();
  return items;
};

export const getUser = async (login) => {
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
  return data;
};

export const getRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  });

  const response = await fetch(`${api}/users/${login}/repos?${params}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  const data = await response.json();
  return data;
};
