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

  setQuery = (query: Query) => {
    this.query = query;
    return this;
  };

  get url() {
    return `${this.host}${this.path}`;
  }

  get = async <T>() => {
    const { data } = await axios.get<T>(this.url, {
      params: this.query,
      withCredentials: true,
    });

    return data;
  };

  post = async <T>(body: object) => {
    const { data } = await axios.post<T>(this.url, body, {
      params: this.query,
      withCredentials: true,
    });

    return data;
  };

  patch = async <T>(body: object) => {
    const { data } = await axios.patch<T>(this.url, body, {
      params: this.query,
      withCredentials: true,
    });

    return data;
  };

  delete = async <T>() => {
    const { data } = await axios.delete<T>(this.url, {
      params: this.query,
      withCredentials: true,
    });

    return data;
  };
}
