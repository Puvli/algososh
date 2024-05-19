interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container) {
      this.container.splice(this.container.length - 1, 1);
    }
  };

  peak = (): T | null => {
    if (this.container) {
      return this.container[this.container.length - 1];
    } else {
      return null;
    }
  };

  getElements = () => this.container;

  getSize = () => this.container.length;

  isEmpty = () => this.container.length === 0;

  clear = () => (this.container = []);
}
