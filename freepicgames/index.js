require("dotenv").config();
const axios = require("axios");

const URL =
  "https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions";
const WEBHOOK_URL = process.env.WEBHOOK_URL;

async function getGames() {
  let freebies = [];
  try {
    const response = await axios.get(URL);
    const games = response.data.data.Catalog.searchStore.elements;
    games.forEach((game) => {
      console.log(game.price.lineOffers[0]?.appliedRules[0]?.endDate);

      let gameData = {
        title: game.title,
        description: game.description,
        endDate: game.effectiveDate,
        offerType: game.offerType,
        images: game.keyImages,
        creator: game.seller.name,
        price: game.price.totalPrice.fmtPrice.originalPrice,
        discountPrice: game.price.totalPrice.fmtPrice.discountPrice,
      };
      freebies.push(gameData);
    });

    return freebies;
  } catch (err) {
    console.error(err);
  }
}

getGames();

// (async () => {
//   try {
//     let games = await getGames();
//     for (const game of games) {
//       let endDate = new Date(game.endDate);
//       let finalDate = endDate.getTime() / 1000 + 900 + 330 * 60;

//       console.log(game);
//       const payload = {
//         username: "FreepicGames",
//         embeds: [
//           {
//             title: game.title,
//             url: "http://example.com",
//             description: game.description,
//             fields: [
//               {
//                 name: "Offer ends in",
//                 value: `<t:${finalDate}:R>, ${game.endDate}`,
//               },
//             ],
//             thumbnail: {
//               url: game.images[2]?.url || "",
//             },
//             image: {
//               url: game.images[0]?.url || "",
//             },
//             footer: {
//               text: "Footer",
//             },
//           },
//         ],
//         width: 1200,
//         height: 1600,
//       };

//       await axios.post(WEBHOOK_URL, payload);
//       console.log("Message sent successfully for:", game.title);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// })();
