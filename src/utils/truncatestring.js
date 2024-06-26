const truncateString = (str) => {
  if (str) {
    if (str.length > 25) {
      return str.slice(0, 25) + "...";
    } else {
      return str;
    }
  } else return;
};

export default truncateString;
