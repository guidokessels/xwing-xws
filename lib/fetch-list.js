import fetch from 'cross-fetch';

const fetchList = async listUrl => {
  const response = await fetch(listUrl);

  if (!response.ok) {
    return false;
  }

  const list = await response.json();

  if (!Array.isArray(list.pilots) || typeof list.faction !== 'string') {
    return false;
  }

  return list;
};

export default fetchList;
