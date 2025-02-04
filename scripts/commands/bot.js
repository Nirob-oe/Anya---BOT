const axios = require('axios');
const fs = require('fs'); 
const path = require('path');

module.exports = {
  config: {
    name: "bot",
    version: "1.0.0",
    permission: 0,
    credits: "nayan",
    description: "talk with bot",
    prefix: 'awto',
    category: "talk",
    usages: "hi",
    cooldowns: 5,
  },

  handleReply: async function ({ api, event }) {
    try {

      const apiData = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json');
      const apiUrl = apiData.data.sim;
      const kl = await axios.get(`https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json`);
      const apiUrl2 = kl.data.api2;
      const response = await axios.get(`${apiUrl}/sim?type=ask&ask=${encodeURIComponent(event.body)}`);
      console.log(response.data);
      const result = response.data.data.msg;

      const textStyles = loadTextStyles();
      const userStyle = textStyles[event.threadID]?.style; 

      const fontResponse = await axios.get(`${apiUrl2}/bold?text=${result}&type=${userStyle}`);
      const text = fontResponse.data.data.bolded;

      api.sendMessage(text, event.threadID, (error, info) => {
        if (error) {
          console.error('Error replying to user:', error);
          return api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
        }
        global.client.handleReply.push({
          type: 'reply',
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          head: event.body
        });
      }, event.messageID);

    } catch (error) {
      console.error('Error in handleReply:', error);
      api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
    }
  },

  start: async function ({ nayan, events, args, Users }) {
    try {
      const msg = args.join(" ");
      const apiData = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json');
      const apiUrl = apiData.data.sim;


      if (!msg) {
        const greetings = [
          "- আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ😇😘",
          "- কি গো সোনা আমাকে ডাকছ কেনো",
          "- বার বার আমাকে ডাকস কেন😡",
          "- আহ শোনা আমার আমাকে এতো ডাক্তাছো কেনো আসো বুকে আশো🥱",
          "- হুম জান তোমার অইখানে উম্মমাহ😷😘",
          "- আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি",
          "- ডাকছ কেন সয়তানে লারে নাকি 🙄",
          "- পিপ পিপ পিপ_ 🚗 –একটু সাইট দেন নয়তো ধাক্কা লেগে –প্রেমে পড়ে যাবেন 🫣",
          "- bal ki bolbe bol 🙂"
        ];
        const name = await Users.getNameUser(events.senderID);
        const rand = greetings[Math.floor(Math.random() * greetings.length)];
        return nayan.reply({
          body: `${name}, ${rand}`,
          mentions: [{ tag: name, id: events.senderID }]
        }, events.threadID, (error, info) => {
          if (error) {
            return nayan.reply('An error occurred while processing your request. Please try again later.', events.threadID, events.messageID);
          }

          global.client.handleReply.push({
            type: 'reply',
            name: this.config.name,
            messageID: info.messageID,
            author: events.senderID,
            head: msg,
          });
        }, events.messageID);
      }

      else if (msg.startsWith("textType")) {
        const selectedStyle = msg.split(" ")[1];
        const options = ['serif', 'sans', 'italic', 'italic-sans', 'medieval', 'normal'];

        if (options.includes(selectedStyle)) {
          saveTextStyle(events.threadID, selectedStyle);
          return nayan.reply({ body: `Text type set to "${selectedStyle}" successfully!` }, events.threadID, events.messageID);
        } else {
          return nayan.reply({ body: `Invalid text type! Please choose from: ${options.join(", ")}` }, events.threadID, events.messageID);
        }
      }

      else if (msg.startsWith("delete")) {
        const deleteParams = msg.replace("delete", "").trim().split("&");
        const question = deleteParams[0].replace("ask=", "").trim();
        const answer = deleteParams[1].replace("ans=", "").trim();

        
        const data = await deleteEntry(question, answer, events, apiUrl);
        const replyMessage = data.msg || data.data.msg;

        return nayan.reply({ body: replyMessage }, events.threadID, events.messageID);
      } 

      else if (msg.startsWith("info")) {
        const response = await axios.get(`${apiUrl}/sim?type=info`);
        const totalAsk = response.data.data.totalKeys;
        const totalAns = response.data.data.totalResponses;

        return nayan.reply({ body: `Total Ask: ${totalAsk}\nTotal Answer: ${totalAns}` }, events.threadID, events.messageID);
      } 

      else if (msg.startsWith("teach")) {
        const teachParams = msg.replace("teach", "").trim().split("&");
        const question = teachParams[0].replace("ask=", "").trim();
        const answer = teachParams[1].
