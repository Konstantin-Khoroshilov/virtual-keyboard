function dispatchEvent(className, event) {
  const keys = Array.from(document.querySelectorAll(`.${className}`));
  keys.forEach((currentKey) => {
    currentKey.dispatchEvent(event);
  });
}

export default dispatchEvent;
