module.exports.config = {
  name: "album",
  version: "0.0.3",
  permission: 0,
  prefix: 'awto',
  credits: "Nayan",
  description: "Random video",
  category: "user",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async function({
  event: e,
  api: a,
  args: n
}) {
  if (!n[0]) return a.sendMessage("====「 𝐕𝐈𝐃𝐄𝐎 」====\n━━━━━━━━━━━━━\n1. 𝐋𝐎𝐕𝐄 𝐕𝐈𝐃𝐄𝐎 💞 \n2. 𝐂𝐎𝐔𝐏𝐋𝐄 𝐕𝐈𝐃𝐄𝐎 💕\n3. 𝐒𝐇𝐎𝐑𝐓 𝐕𝐈𝐃𝐄𝐎 📽\n4. 𝐒𝐀𝐃 𝐕da𝐄𝐎 😔\n5. 𝐒𝐓𝐀𝐓𝐔𝐒 𝐕𝐈𝐃𝐄𝐎 📝\n𝟞. 𝐒𝐇𝐀𝐈𝐑𝐈\n7. 𝐁𝐀𝐁𝐘 𝐕𝐈𝐃𝐄𝐎 😻\n8. 𝐀𝐍𝐈𝐌𝐄 𝐕𝐈𝐃𝐄𝐎 \n9. 𝐇𝐔𝐌𝐀𝐈𝐘𝐔𝐍 𝐅𝐎𝐑𝐈𝐃 𝐒𝐈𝐑 ❄\n10. 𝐈𝐒𝐋𝐀𝐌𝐈𝐊 𝐕𝐈𝐃𝐄𝐎 🤲\n\n===「 𝟏𝟖+ 𝐕𝐈𝐃𝐄𝐎 」===\n━━━━━━━━━━━━━\n11. 𝐇𝐎𝐑𝐍𝐘 𝐕𝐈𝐃𝐄𝐎 🥵\n12. 𝐇𝐎𝐓 🔞\n13. 𝐈𝐓𝐄𝐌\n\nTell me how many video numbers you want to see by replying to this message", e.threadID, ((a, n) => {
    global.client.handleReply.push({
      name: this.config.name,
      messageID: n.messageID,
      author: e.senderID,
      type: "create"
    })
  }), e.messageID)
}; 

module.exports.handleReply = async ({
  api: e,
  event: a,
  client: n,
  handleReply: t,
  Currencies: s,
  Users: i,
  Threads: o
}) => {
  var { p, h } = await linkanh(a.body);
  const axios = require("axios");
  if ("create" === t.type) {
    const response = await p.get(h);
    const data = response.data.data;
    const cap = response.data.nayan;
    const cn = response.data.count;
    let nayan = (await p.get(data, {
      responseType: "stream"
    })).data;
    return e.sendMessage({
      body: `${cap}` + `\n\n¤《𝐓𝐎𝐓𝐀𝐋 𝐕𝐈𝐃𝐄𝐎: ${cn}》¤`,
      attachment: nayan
    }, a.threadID, a.messageID)
  }
};

async function linkanh(choice) {
  const axios = require("axios");
  const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json');
  const n = apis.data.api
  const options = {
    "1": "/video/love",
    "2": "/video/cpl",
    "3": "/video/shortvideo",
    "4": "/video/sadvideo",
    "5": "/video/status",
    "6": "/video/shairi",
    "7": "/video/baby",
    "8": "/video/anime",
    "9": "/video/humaiyun",
    "10": "/video/islam",
    "11": "/video/horny",
    "12": "/video/hot",
    "13": "/video/item"
  };
  const h = `${n}${options[choice]}`;
  return { p: axios, h };
}
