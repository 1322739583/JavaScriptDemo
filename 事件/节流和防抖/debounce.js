function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout();

    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}
