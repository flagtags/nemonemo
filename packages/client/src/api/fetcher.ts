import axios from 'axios';

type Query = { [key: string]: number | string };

export default class Fetcher {
  host: string;
  path: string;
  query: Query;

  constructor(path: string) {
    this.host = 'http://localhost:3000';
    this.path = path;
    this.query = {};
  }

  setQuery(query: Query) {
    this.query = query;
    return this;
  }

  get url() {
    return `${this.host}${this.path}`;
  }

  async get<T>() {
    const { data } = await axios.get<T>(this.url, {
      params: this.query,
      withCredentials: true,
    });

    return data;
  }

  async post<T>(body: object) {
    const { data } = await axios.post<T>(this.url, body, {
      params: this.query,
      withCredentials: true,
    });

    return data;
  }

  async patch<T>(body: object) {
    const { data } = await axios.patch<T>(this.url, body, {
      params: this.query,
      withCredentials: true,
    });

    return data;
  }

  async delete<T>() {
    const { data } = await axios.delete<T>(this.url, {
      params: this.query,
      withCredentials: true,
    });

    return data;
  }
}
