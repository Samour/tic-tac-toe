import { GameState, Plugin, PluginAccess, PluginFactory } from '@tictactoe/interfaces';
import { EventType, IEvent, stateMutationEvent } from '@tictactoe/interfaces/events';
import { playerChangeActiveMutation } from '@tictactoe/interfaces/mutations';

class NextPlayerPlugin implements Plugin {

  private playerCellsCount: Map<string, number> = new Map();
  private activePlayerId: string | undefined;

  constructor(private readonly pluginAccess: PluginAccess) { }

  private countCells(state: GameState): Map<string, number> {
    const count = new Map();
    state.board.cells.forEach((row) =>
      row.forEach((cell) => {
        if (!cell.heldByPlayerId) {
          return;
        }
        if (!count.has(cell.heldByPlayerId)) {
          count.set(cell.heldByPlayerId, 0);
        }
        count.set(cell.heldByPlayerId, count.get(cell.heldByPlayerId) + 1);
      })
    );

    return count;
  }

  private getActivePlayerId(state: GameState): string | undefined {
    return Array.from(state.players.players.values())
      .find((p) => p.active)
      ?.playerId;
  }

  private getNonActivePlayerId(state: GameState): string | undefined {
    return Array.from(state.players.players.values())
      .find((p) => !p.active)
      ?.playerId;
  }

  onLoad(): void {
    this.playerCellsCount = this.countCells(this.pluginAccess.getState());
    this.activePlayerId = this.getActivePlayerId(this.pluginAccess.getState());
  }

  private changeIsRelevantPlay(
    originalCount: Map<string, number>,
    newCount: Map<string, number>,
    playerId: string
  ): boolean {
    if (!newCount.has(playerId)) {
      return false;
    }

    // Check for any key we might miss in iterating over newCount
    for (let id of originalCount.keys()) {
      if (!newCount.has(id)) {
        return false;
      }
    }

    for (let id of newCount.keys()) {
      const count: number = originalCount.get(id) ?? 0;
      if (id === playerId && newCount.get(id) != count + 1) {
        return false;
      }
      if (id !== playerId && newCount.get(id) != count) {
        return false;
      }
    }

    return true;
  }

  private stateChangeMgt(): void {
    const state = this.pluginAccess.getState();
    const updatedCellsCount = this.countCells(state);
    const newActivePlayerId = this.getActivePlayerId(state);

    const shouldChangeActivePlayer = newActivePlayerId && newActivePlayerId === this.activePlayerId
      && this.changeIsRelevantPlay(
        this.playerCellsCount,
        updatedCellsCount,
        newActivePlayerId
      );
    this.playerCellsCount = updatedCellsCount;
    this.activePlayerId = newActivePlayerId;

    if (shouldChangeActivePlayer) {
      const targetPlayerId = this.getNonActivePlayerId(state);
      if (!targetPlayerId) {
        return;
      }
      const mutation = playerChangeActiveMutation(targetPlayerId);
      const event = stateMutationEvent(mutation);
      this.pluginAccess.publishEvent(event);
    }
  }

  handleEvent(event: IEvent): void {
    if (event.type === EventType.STATE_UPDATED) {
      this.stateChangeMgt();
    }
  }
}

export const factory: PluginFactory = {
  getPluginName: () => 'nextPlayer',
  create: (pluginAccess) => new NextPlayerPlugin(pluginAccess),
};
