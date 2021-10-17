type Predicate<T> = (i: T) => boolean;
type ItemMapper<T> = (i: T) => T;
type ListMapper<T> = (list: T[]) => T[];
type MapUpdater<K, T> = (map: Map<K, T>) => Map<K, T>;

export const updateItemInList = <T>(predicate: Predicate<T>): (mapper: ItemMapper<T>) => ListMapper<T> => {
  return (mapper) => {
    return (list) => list.map((i) =>
      predicate(i) ? mapper(i) : i,
    );
  };
};

export const updateMap = <K, T>(key: K, mapper: ItemMapper<T>): MapUpdater<K, T> => {
  return (map) => {
    const entryFilter = updateItemInList<[K, T]>(([k, i]) => k === key);
    const entryMap = entryFilter(([k, t]) => [k, mapper(t)]);

    return new Map(
      entryMap(Array.from(map.entries()))
    );
  };
};
