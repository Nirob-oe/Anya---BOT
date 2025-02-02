module.exports.config = {
  name: "anime1",
  version: "1.0.0",
  permission: 2,
  credits: "Nayan",
  description: "anime video",
  prefix: true, 
  category: "user", 
  usages: "anime1",
  cooldowns: 5,
  dependencies: {
	}
};

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  var link = [
     "https://drive.google.com/file/d/13qRXcHKClSvVcmx8kiPasBo9bpKyPoR8/view?usp=drivesdk",
    ];
   var callback = () => api.sendMessage({body:`Sensei 🤍 +\nSố ảnh: ${link.length}`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback());
   };
