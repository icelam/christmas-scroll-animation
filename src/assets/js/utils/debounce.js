const debounce = (functionToDebounce, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const functionArguments = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => functionToDebounce.apply(context, functionArguments), delay);
  };
};

export default debounce;
