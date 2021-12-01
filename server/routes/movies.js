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

module.exports = router;
