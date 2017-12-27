import nodeFetch from 'node-fetch';

export const fetchList = async listUrl => {
  const response = await nodeFetch(listUrl);

  if (!response.ok) {
    return false;
  }

  const list = await response.json();

  if (!Array.isArray(list.pilots) || typeof list.faction !== 'string') {
    return false;
  }

  return list;
};
