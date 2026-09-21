import type { Room as RoomState } from '@pomodoro/shared';
import { Room } from '../domain/room.entity';

export function toRoomState(room: Room): RoomState {
  return {
    roomId: room.roomId,
    mode: room.mode,
    currentCycle: room.currentCycle,
    timer: room.timer,
    participants: [...room.participants.values()],
  };
}
