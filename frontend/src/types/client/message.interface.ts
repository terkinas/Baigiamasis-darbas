export interface IClientMessage {
    user : {
        username: string;
        avatarId: number;
    }
    content: string;
    createdAt: Date;
}