export interface IUser {
  _id?: string
  email: string
  password: string
  firstName?: string
  lastName?: string
  createdAt?: Date
  updatedAt?: Date
}
export interface CustomRequest {
  user: IUser
  file: object
  params: object
  query: object
  path: object
}

interface Person {
  $search: string;
}

export interface IFilter {
  verified?: string
  role?: string
  $text: Person;
}

export interface IChannel {
  _id: string
  name: string
  members: string[]
}

export interface ILogin {
  email: string
  password: string
}

export interface ITask {
  _id: string;
  owner: string;
  name: string;
  channelId: string;
  description: string;
  createdAt?: Date
  updatedAt?: Date
}

export interface Search {
  $search: string;
}

export interface IPostQuery {
  _id: string;
  owner: string;
  post: string;
  likes: number;
  comment: number;
  location: string;
  $text: Search;
}

export const mqQueues = {
  FORUM: "publicChat",
  CHAT: "privateChat",
  NOTIFICATION: "notification",
  EMAIL: "email",
  SMS: "sms",
};
