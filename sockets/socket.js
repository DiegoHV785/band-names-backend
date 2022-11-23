const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();
bands.addBand(new Band("Breaking Benjamin"));
bands.addBand(new Band("Bon Jovi"));
bands.addBand(new Band("Héroes del Silencio"));
bands.addBand(new Band("Metallica"));


//Mensajes de Sockets
io.on("connection", (client) => {

  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
  });

  client.on("mensaje", (payload) => {
    io.emit("mensaje", { admin: "Nuevo mensaje" });
  });

  client.on("vote-band", (payload) => {
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  //Escuchar: add-band
  client.on("add-band", (payload) =>{
    const newBand = new Band(payload.name);
    bands.addBand(newBand);
    io.emit("active-bands", bands.getBands());
  });

  client.on("delete-band", (payload) => {
    bands.deleteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  //Escuchar: delete-band

  /*client.on("emitir-mensaje", (payload) => {
    //console.log(payload);
    //io.emit('nuevo-mensaje', payload);
    client.broadcast.emit('nuevo-mensaje', payload);
  });*/
});
