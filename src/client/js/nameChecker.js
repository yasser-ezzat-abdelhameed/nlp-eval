function checkForName(inputText) {
  return inputText && inputText.length >= 3 && inputText.length <= 32;
}

export { checkForName };
