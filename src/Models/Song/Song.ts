import { RegisteredUser } from '../User';

export class Song {
  public id: string;
  public songId: string;
  public source: string;
  public status: string;
  public skipped: boolean;
  public url: string;
  public title: string;
  public thumbnail: string;
  public duration: number;
  public creator: RegisteredUser;
  public upVoteCount: number;
  public downVoteCount: number;
  public upvoteUserList: RegisteredUser[];
  public downvoteUserList: RegisteredUser[];
  public message: string;
  public messages: string;
  public createdAt: string;
}
