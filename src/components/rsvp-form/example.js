db.collection("data").doc().set({ test: true }).then(function() {
  console.log("Document successfully written!");
});

db.collection("rsvp").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    Logger.info(doc.id, " => ", doc.data());
    this.temporaryData.push(doc.data());
  });
});
