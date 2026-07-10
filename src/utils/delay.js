const delay = (ms) => {
  console.log("timeout set...");
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export default delay;
