import IUser from './IUser';

export default interface IStore {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  employees: IUser[];
  owner: IUser;
}
