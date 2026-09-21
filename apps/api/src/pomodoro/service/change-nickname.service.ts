import { Injectable } from '@nestjs/common';
import { RoomQueryService } from './room-query.service';
import { RoomRepository } from '../repository/room.repository';
import { SseService } from './sse.service';
import { toRoomState } from '../dto/room.mapper';

@Injectable()
export class ChangeNicknameService {
  constructor(
    private readonly roomQueryService: RoomQueryService,
    private readonly roomRepository: RoomRepository,
    private readonly sseService: SseService,
  ) {}

  changeNickname(
    roomId: string,
    participantId: string,
    nickname: string,
  ): void {
    const room = this.roomQueryService.findExistingRoom(roomId);

    room.changeNickname(participantId, nickname);
    this.roomRepository.save(room);

    this.sseService.emit(roomId, {
      type: 'room_state',
      data: toRoomState(room),
    });
  }
}
