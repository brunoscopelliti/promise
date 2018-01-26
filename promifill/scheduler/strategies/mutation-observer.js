class MutationObserverStrategy {
  constructor (handler) {
    const observer = new MutationObserver(handler);
    const node = this.node =
      document.createTextNode("");
    observer.observe(node, { characterData: true });
  }

  trigger () {
    this.node.data = this.node.data === 1
      ? 0
      : 1;
  }
}

module.exports = MutationObserverStrategy;
