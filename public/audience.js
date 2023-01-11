const roomSession = new SignalWire.Video.RoomSession({
  token: _token,
  rootElement: document.getElementById("videoRoot"),
  audio: false,
  video: false,
});

roomSession.join();