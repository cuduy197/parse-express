function cloud(cloudName, data) {
  console.log("Khởi động: " + cloudName);
  Parse.Cloud
    .run(cloudName, data)
    .then(result => console.log(result))
    .catch(e => console.error(e.message));
}
