export interface IClientMessage {
    user : {
        username: string;
    }
    content: string;
    createdAt: Date;
}