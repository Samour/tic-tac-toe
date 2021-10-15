import { MutationType } from '../MutationType';
import { IMutation } from '../IMutation';

export interface PlayerChangeActiveMutation extends IMutation {
  type: MutationType.PLAYER__CHANGE_ACTIVE,
  activePlayerId: string;
}

export const playerChangeActiveMutation = (activePlayerId: string): PlayerChangeActiveMutation => ({
  type: MutationType.PLAYER__CHANGE_ACTIVE,
  activePlayerId,
});
