var _myMemberId = null;
var _currentRecording = null;

const roomSession = new SignalWire.Video.RoomSession({
  token: _token,
  rootElement: document.getElementById("videoRoot"),
  audio: true,
  video: true,
});

roomSession.on('room.joined', async (params) => {
  _myMemberId = params.member_id
  await roomSession.hideVideoMuted();
  toggle('#toolbar')
})

roomSession.on("member.joined", async (e) => {
  console.log("member.joined", e.member.name);
});

roomSession.on("memberList.updated", async (e) => {
  console.log("memberList.updated", e.members);
});

roomSession.on("room.audience_count", async (e) => {
  console.log("room.audience_count", e);
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

async function toggleRec() {
  if(_currentRecording) {
    // recording is active
    console.log('stopping recording')
    await _currentRecording.stop();
    _currentRecording = null;
    hide(stopRec);
    show(startRec);
  } else {
    console.log('starting recording')
    _currentRecording = await roomSession.startRecording();
    hide(startRec);
    show(stopRec);
  }
}