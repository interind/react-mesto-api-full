const imagesCheck = (link) => new Promise((resolve, reject) => {
  const image = new Image();
  image.src = link;
  image.onload = () => resolve();
  image.onerror = () => reject();
});

export default imagesCheck;
