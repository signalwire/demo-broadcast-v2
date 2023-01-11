const axios = require('axios');

async function getToken(user_name, room_name, type = "broadcast") {
  const auth = {
    username: process.env.SIGNALWIRE_PROJECT_ID, // Project-ID
    password: process.env.SIGNALWIRE_TOKEN, // API token 
  };

  try {
    if (type == 'audience') {
      let token = await axios.post(
        `https://${process.env.SIGNALWIRE_SPACE}/api/video/room_tokens`,
        {
            user_name,
            room_name,
            permissions: [
                "room.self.audio_mute",
                "room.self.audio_unmute",
                "room.self.video_mute",
                "room.self.video_unmute",
                "room.hide_video_muted"
            ],
            join_as: 'audience'
        },
        { auth }
      );
      return token.data.token
    } else {
      let token = await axios.post(
        `https://${process.env.SIGNALWIRE_SPACE}/api/video/room_tokens`,
        {
            user_name,
            room_name,
            permissions: [
                "room.self.audio_mute",
                "room.self.audio_unmute",
                "room.self.video_mute",
                "room.self.video_unmute",
                "room.hide_video_muted",
                "room.playback",
                "room.set_layout",
                "room.set_position"
            ],
            end_room_session_on_leave: true
        },
        { auth }
      );
      return token.data.token
    }
    
    return token.data.token
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = {
  getToken
}