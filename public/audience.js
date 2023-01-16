var _myMemberId = null;

const roomSession = new SignalWire.Video.RoomSession({
  token: _token,
  rootElement: document.getElementById("videoRoot"),
  audio: false,
  video: false,
});

roomSession.on('room.joined', async (params) => {
  console.log(params)
  _myMemberId = params.member_id
  toggle('#toolbar')
})

roomSession.join();

async function hangup() {
  await roomSession.leave();
}

async function requestPromotion() {
  console.log("member_id", _myMemberId)
  await fetch('/notify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      member_id: _myMemberId
    })
  });
}