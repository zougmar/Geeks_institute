const delayedPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("success");
  }, 4000); // 4 seconds delay
});

delayedPromise.then(result => console.log(result));
