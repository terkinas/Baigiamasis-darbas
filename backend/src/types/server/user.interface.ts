export interface IServerUser {
    id?: number;
    username: string;
    password: string;
    balance?: {
      amount: number;
    }
}