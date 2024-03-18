const RichMediaMessage = require("viber-bot").Message.RichMedia;

function say(response, id) {
  console.log(id);

  const SAMPLE_RICH_MEDIA = {
    Type: "rich_media",
    ButtonsGroupColumns: 6,
    ButtonsGroupRows: 7,
    BgColor: "#002352",
    Buttons: [
      {
        Columns: 6,
        Rows: 7,
        ActionType: "open-url",
        ActionBody: `http://localhost:5173/plans?id=${id}`,
        Image:
          "https://i.ibb.co/ZK2gjYh/Colorful-Web-Domain-Price-List-Instagram-Post.png",
        onClick: () => {
          console.log("Clicked");
        },
      },

      {
        Columns: 6,
        Rows: 7,
        ActionType: "open-url",
        ActionBody: "https://www.google.com",
        Image:
          "https://i.ibb.co/Khn6mYG/Colorful-Web-Domain-Price-List-Instagram-Post-1.png",
      },
    ],
  };
  response.send(new RichMediaMessage(SAMPLE_RICH_MEDIA));
}

module.exports = say;
