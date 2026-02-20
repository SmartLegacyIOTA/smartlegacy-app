type Callback = (data: any) => void;

class NavigationCallbackRegistry {
  private callbacks = new Map<string, Callback>();

  register(callback: Callback): string {
    const id = Math.random().toString(36).substring(2, 9);
    this.callbacks.set(id, callback);
    return id;
  }

  getAndRemove(id: string): Callback | undefined {
    const callback = this.callbacks.get(id);
    this.callbacks.delete(id);
    return callback;
  }
}

export const navigationCallbackRegistry = new NavigationCallbackRegistry();
