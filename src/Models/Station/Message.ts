import { MessageSender } from './MessageSender';

export class Message {
  public id: string;
  public stationId: string;
  public sender: MessageSender;
  public content: string;
  public createdAt: string;
}
