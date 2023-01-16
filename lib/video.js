const { Video } = require('@signalwire/realtime-api')
const videoClient = new Video.Client({
  project: process.env.SIGNALWIRE_PROJECT_ID,
  token: process.env.SIGNALWIRE_TOKEN,
  debug: { logWsTraffic: false },
})

videoClient.on('room.started', async (roomSession) => {
  console.log({ id: roomSession.id, name: roomSession.name }, 'room.started')

  roomSession.on('recording.started', async (e) => {
    console.log('recording.started', e.id)
  })

  roomSession.on('recording.ended', async (e) => {
    console.log('recording.ended', e.id)
  })
})

module.exports = {
  videoClient
}