import axios from 'axios';
import { ApiConnectionOptions, Config } from './Interfaces/Config/config.interface';

/**
 * @classdesc The APICall class is a class that sends an API request to a server and returns the response.
 * @class
 */
export class APICall {
  /**
   * It takes in an object with a url, method, data, and headers property, and returns a promise that
   * resolves to the data from the response, or rejects with the error from the response.
   */
  async send(params: ApiConnectionOptions) {
    return axios(params.url, {
      method: params.method,
      data: params.data,
      headers: params.headers,
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return Promise.reject(error.response.data);
      });
  }
}

/**
 * @classdesc The SetConfig class is a class that takes a Config object and sets the properties of the SetConfig
 * class to the properties of the Config object.
 * @class
 * @abstract
 */
export class SetConfig {
  IDENTITY_SERVER: string;
  JOIN_SERVER: string;
  NETWORK_SERVER: string;
  APPLICATION_SERVER: string;
  API_KEY: string;
  TENANT_ID: string | undefined;
  /**
   * The above function is a constructor function that takes a config object as a parameter and assigns
   * the values of the config object to the class properties.
   * @param {Config} config - Config
   */
  constructor(config: Config) {
    this.IDENTITY_SERVER = `https://${config.IDENTITY_SERVER}/api/v3`;
    this.JOIN_SERVER = `https://${config.JOIN_SERVER}/api/v3/js`;
    this.APPLICATION_SERVER = `https://${config.APPLICATION_SERVER}/api/v3/as`;
    this.NETWORK_SERVER = `https://${config.NETWORK_SERVER}/api/v3/ns`;
    this.API_KEY = config.API_KEY;
    this.TENANT_ID = config.TENANT_ID;
  }

  /**
   * The headers function returns an object with a key of AUTHORIZATION and a value of Bearer + the
   * API_KEY.
   * @returns The headers object.
   */
  get headers() {
    const headers = { AUTHORIZATION: `Bearer ${this.API_KEY}` };
    return headers;
  }
}
