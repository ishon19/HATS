const getColorBySentiment = (sentiment: string): string => {
  if (sentiment === "positive") {
    return "#26a69a";
  }
  if (sentiment === "negative") {
    return "#ff3d00";
  }
  return "#ffa000";
};

export { getColorBySentiment };
