export interface IClientUser {
  id: string;
  username: string;
  avatarId: number;
  balance?: {
    amount: number;
    lastClaimed: number;
  },
  xp?: number;
}