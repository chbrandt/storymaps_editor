function capitalize(string, what) {
  // 'what' can have three values:
  // '-1': nothing (lower-case),
  // '0': just the first character (title),
  // '1': whole string (upper-case)
  what = what || 0;
  if (what == -1) {
    return string.toLowerCase();
  }
  if (what == 1) {
    return string.toUpperCase();
  }
  return string.charAt(0) + string.slice(1);
}

export {capitalize};
