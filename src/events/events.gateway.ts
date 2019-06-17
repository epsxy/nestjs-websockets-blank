import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // tslint:disable-next-line:no-empty
  afterInit(server: any) {}

  handleConnection(client: any): void {
    // tslint:disable-next-line:no-console
    console.warn(`Client[${client.id}] connected]`);
    // tslint:disable-next-line:no-console
    console.log(this.server.clients.forEach(c => console.log(c)));
  }

  handleDisconnect(client: any): void {
    // tslint:disable-next-line:no-console
    console.warn(`Client[${client.id}] disconnected]`);
  }

  @SubscribeMessage('client')
  onEvent(client: any, data: any): void {
    // tslint:disable-next-line:no-console
    console.warn(`Channel[${client.id}]: ${data}`);
  }
}
