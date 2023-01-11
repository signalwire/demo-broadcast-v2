var _myMemberId = null;

const roomSession = new SignalWire.Video.RoomSession({
  token: _token,
  rootElement: document.getElementById("videoRoot"),
  audio: true,
  video: true,
});

roomSession.on('room.joined', async (params) => {
  _myMemberId = params.member_id
  await roomSession.hideVideoMuted();
})

roomSession.on("member.joined", async (member) => {

});

roomSession.on("member.left", async (member) => {

});

roomSession.on("playback.started", async (member) => {
  await roomSession.audioMute();
});

roomSession.on("playback.ended", async (member) => {
  console.log('reset layout')
  await roomSession.audioUnmute();
  await roomSession.setLayout({ name: "grid-responsive" })
});

roomSession.join();

async function hangup() {
  await roomSession.leave();
}

const ads = ['future', 'ogs', 'realtime']

async function playVideo() {

  const url_to_play = `https://lucas-testing-sounds.s3.us-east-2.amazonaws.com/${_.sample(ads)}.mp4`;

  const layoutTypes = [{ 
    url: url_to_play,
    layout: "screen-share",
    positions: {
        self: "screen",
        _myMemberId: "reserved-7"
      },
  },{ 
    url: url_to_play,
    layout: "grid-responsive"
  }]

  await roomSession.play(_.sample(layoutTypes));
}