import { APICall, SetConfig } from '../index';
import { Config } from '../Interfaces/Config/config.interface';
import {
  CreateApplicationPayload,
  CreateApplication,
  CreateApplicationUserPayload,
  GetApplicationList,
  CreateAPIKeyUserPayload,
  CreateAPIKey,
  CreateAPIKeyPayload,
  GetAPIKeyListUserPayload,
  GetAPIKeyList,
  GetAPIKeyInfoUserPayload,
  GetAPIKeyInfo,
  UpdateAPIKeyUserPayload,
  UpdateAPIKey,
  UpdateAPIKeyPayload,
} from '../Interfaces/User/user.interface';

/**
 * @classdesc The User class is a child class of the SetConfig class. The User class has a constructor that takes
 * in a userID and a config object. The User class has a bunch of methods that make API calls to the Identity Server.
 * @extends SetConfig
 */
export class User extends SetConfig {
  private USER_ID: string;
  private API: APICall = new APICall();

  /**
   * The constructor function is a special function that is called when an object is created from a
   * class
   * @param {string} userID - The user ID of the user you want to get the profile of.
   * @param {Config} config - Config - This is the configuration object that is passed to the
   * constructor of the base class.
   */
  constructor(userID: string, config: Config) {
    super(config);
    this.USER_ID = userID;
  }

  /**
   * It creates an application for the user.
   * @type {import("../dist/Interfaces/Doc Common/docApp.interface").Input-CreateApplication}
   * @param {Input-CreateApplication} payload - Input-CreateApplication
   * @returns {import("../dist/Interfaces/Doc Common/docApp.interface").Output-CreateApplication}
   * The response from the API.
   * @example
   * const createApplicationPayloadForUser = {
      application_id: 'meet59',
      name: 'meet',
      description: '',  };
   *
   * const user = new User('meetsavaj', config);
   * const response = await user.createApplication(createApplicationPayloadForUser);
   */
  createApplication(payload: CreateApplicationUserPayload): Promise<CreateApplication> {
    const apiPayload: CreateApplicationPayload = {
      application: {
        ids: { application_id: payload.application_id },
        name: payload.name,
        description: payload.description,
      },
    };
    return this.API.send({
      method: 'POST',
      url: `${this.IDENTITY_SERVER}/users/${this.USER_ID}/applications`,
      headers: this.headers,
      data: apiPayload,
    });
  }

  /**
   * It returns the list of applications that have been created by the user.
   * @returns {import("../dist/Interfaces/Doc Common/docApp.interface").Output-GetApplicationList}
   * The response from the API.
   */
  getApplicationList(): Promise<GetApplicationList> {
    return this.API.send({
      method: 'GET',
      url: `${this.IDENTITY_SERVER}/users/${this.USER_ID}/applications`,
      headers: this.headers,
      data: {},
    });
  }

  /**
   * It creates an api key for the user.
   * @type {import("../dist/Interfaces/Doc Common/docApp.interface").Input-CreateAPIKeyForUser}
   * @param {Input-CreateAPIKeyForUser} payload - Input-CreateAPIKeyForUser
   * @returns {import("../dist/Interfaces/Doc Common/docApp.interface").Output-CreateAPIKey}
   * The response from the API.
   */
  createAPIKey(payload: CreateAPIKeyUserPayload): Promise<CreateAPIKey> {
    const apiPayload: CreateAPIKeyPayload = {
      user_ids: { user_id: this.USER_ID, email: payload.email },
      name: payload.name,
      rights: payload.rights,
      expires_at: payload.expires_at,
    };
    return this.API.send({
      method: 'POST',
      url: `${this.IDENTITY_SERVER}/users/${this.USER_ID}/api-keys`,
      headers: this.headers,
      data: apiPayload,
    });
  }

  /**
   * It returns the list of api keys that have been created by the user.
   * @type {import("../dist/Interfaces/Doc Common/docApp.interface").cGetAPIKeyList}
   * @param {Input-GetAPIKeyList} payload - Input-GetAPIKeyList
   * @returns {import("../dist/Interfaces/Doc Common/docApp.interface").Output-GetAPIKeyList}
   * The response from the API.
   */
  getAPIKeyList(payload: GetAPIKeyListUserPayload): Promise<GetAPIKeyList> {
    return this.API.send({
      method: 'GET',
      url: `${this.IDENTITY_SERVER}/users/${this.USER_ID}/api-keys`,
      headers: this.headers,
      data: payload,
    });
  }

  /**
   * It returns the information of the api key that has been created by the user.
   * @type {import("../dist/Interfaces/Doc Common/docApp.interface").Input-GetAPIKeyInfo}
   * @param {Input-GetAPIKeyInfo} payload - Input-GetAPIKeyInfo
   * @returns {import("../dist/Interfaces/Doc Common/docApp.interface").Output-GetAPIKeyInfo}
   * The response from the API.
   */
  getAPIKeyInfo(payload: GetAPIKeyInfoUserPayload): Promise<GetAPIKeyInfo> {
    return this.API.send({
      method: 'GET',
      url: `${this.IDENTITY_SERVER}/users/${this.USER_ID}/api-keys/${payload.key_id}`,
      headers: this.headers,
      data: {},
    });
  }

  /**
   * It returns the information of the api key that has been created by the user.
   * @type {import("../dist/Interfaces/Doc Common/docApp.interface").Input-UpdateAPIKeyOfUser}
   * @param {Input-UpdateAPIKeyOfUser} payload - Input-UpdateAPIKeyOfUser
   * @returns {import("../dist/Interfaces/Doc Common/docApp.interface").Output-UpdateAPIKey}
   * The response from the API.
   */
  updateAPIKey(payload: UpdateAPIKeyUserPayload): Promise<UpdateAPIKey> {
    const receievePayload = {
      name: payload.api_key_name,
      rights: payload.api_key_rights,
      expires_at: payload.expires_at,
    };

    const extractPayload = JSON.parse(JSON.stringify(receievePayload));
    const paths = Object.keys(extractPayload);

    const apiPayload: UpdateAPIKeyPayload = {
      user_ids: { user_id: this.USER_ID, email: payload.email },
      api_key: {
        id: payload.api_key_id,
        name: payload.api_key_name,
        rights: payload.api_key_rights,
        expires_at: payload.expires_at,
      },
      field_mask: {
        paths: paths,
      },
    };
    return this.API.send({
      method: 'PUT',
      url: `${this.IDENTITY_SERVER}/users/${this.USER_ID}/api-keys/${payload.api_key_id}`,
      headers: this.headers,
      data: apiPayload,
    });
  }
}
