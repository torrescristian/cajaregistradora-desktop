import { IFixedNativeResponse } from "./utils";

export default interface IClient {
  name: string;
  phone_number: string;
  address: string;
  id?: number;
}

export type IClientResponse = IFixedNativeResponse<IClient>