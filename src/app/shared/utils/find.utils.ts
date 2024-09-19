export class Find {
  static findById<T extends { id?: number }>(
    items: T[],
    id: any
  ): T | undefined {
    return items.find(
      (item) => item.id !== undefined && item.id === Number(id)
    );
  }
}
