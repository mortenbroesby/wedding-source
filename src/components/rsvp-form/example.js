db.collection("data").doc().set({ test: true }).then(function() {
  console.log("Document successfully written!");
});