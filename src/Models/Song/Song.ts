import { User } from '../User';

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
  public creator: User;
  public upVoteCount: number;
  public downVoteCount: number;
  public upvoteUserList: User[];
  public downvoteUserList: User[];
  public message: string;
  public createdAt: string;
}
