class ListFetcher {
  constructor(fetch) {
    this._fetchFn = fetch;
  }
  async fetch(listUrl) {
    const response = await this._fetchFn(listUrl);

    if (!response.ok) {
      return false;
    }

    const list = await response.json();

    if (!Array.isArray(list.pilots) || typeof list.faction !== 'string') {
      return false;
    }

    return list;
  }
}

export default ListFetcher;
