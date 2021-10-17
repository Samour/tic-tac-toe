enum MutationType {
  PLAYER__CHANGE_ACTIVE = 'Player/ChangeActive',

  BOARD__CHANGE_CELL_HELD_BY_PLAYER = 'Board/ChangeCellHeldByPlayer',
  BOARD__CLEAR_ALL_CELLS = 'Board/ClearAllCells',

  PLUGIN_COMPONENT__INSERT = 'PluginComponent/Insert',
  PLUGIN_COMPONENT__REMOVE = 'PluginComponent/Remove',
}

export { MutationType };
