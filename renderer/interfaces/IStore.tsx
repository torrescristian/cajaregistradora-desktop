import IUser from './IUser';

export interface IStoreUI {
  id: number;
  name: string;
}

export default interface IStore {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  employees: IUser[];
  owner: IUser;
}
