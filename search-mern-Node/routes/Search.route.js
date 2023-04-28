const express = require("express");
const Searchrouter = express.Router();
const {Ad} = require("../models/Ad.model");

Searchrouter.get("/search", async (req, res) => {
  const keyword = req.query.keyword;

  

  try {
    // const results= await Ad.find({"$or":[{"primaryText":keyword},{"headline":keyword},{"description":keyword}]})
    
    const results = await Ad.aggregate([
      { $lookup: { from: 'companies', localField: 'companyId', foreignField: '_id', as:'company' } },
      {
        $match: {
          $or: [
            { "companyId": +keyword },
            { "primaryText": { $regex: keyword, $options: "i" } },
            { "headline": { $regex: keyword, $options: "i" } },
            { "description": { $regex: keyword, $options: "i" } },
            { "company.CompanyName": { $regex: keyword, $options: "i" } }
          ]
        }
      }
    ])
    
    // const results = await Ad.aggregate([
    //   {
    //     $search: {
    //       text: {
    //         query: keyword,
    //         path: [ "companyName", "primaryText", "headline", "description"]
    //       }
    //     }
    //   },
    //   {
    //     $unwind: "$companyName"
    //   }
    // ]);

    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {Searchrouter};
