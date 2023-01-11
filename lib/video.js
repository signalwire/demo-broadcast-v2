const { Video } = require('@signalwire/realtime-api')
const videoClient = new Video.Client({
  project: process.env.SIGNALWIRE_PROJECT_ID,
  token: process.env.SIGNALWIRE_TOKEN,
  debug: { logWsTraffic: false },
})

videoClient.on('room.started', async (roomSession) => {
  console.log({ id: roomSession.id, name: roomSession.name }, 'room.started')
})

module.exports = {
  videoClient
}