const router = require("express").Router();

const axios = require("axios");

const ID_KEY = "1pga8Sdf3dCx_o2Rdf8G";
const SECRET_KEY = "XZifsVUdOS";

router.get("/getMovie", async function (req, res) {
  let query = req.query.query;
  let reqOptions = {
    headers: {
      "X-Naver-Client-Id": ID_KEY,
      "X-Naver-Client-Secret": SECRET_KEY,
    },
    params: {
      query: query,
    },
  };
  try {
    let movieRes = await axios.get(
      "https://openapi.naver.com/v1/search/movie.json",
      reqOptions
    );
    return res.json(movieRes.data);
  } catch (e) {
    return res.json({
      status: 400,
      message: e,
    });
  }
});

// router.get("/getMovie", async function (req, res) {
//   const word = req.query.query;
//   axios
//     .get("https://openapi.naver.com/v1/search/movie.json", {
//       params: {
//         query: word,
//         display: 20,
//       },
//       headers: {
//         "X-Naver-Client-Id": ID_KEY,
//         "X-Naver-Client-Secret": SECRET_KEY,
//         "Access-Control-Allow-Origin": "*",
//       },
//     })
//     .then(function (response) {
//       console.log(response.data.items);
//       const items = response.data.items;
//       res.send({ items: items });
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });

module.exports = router;
