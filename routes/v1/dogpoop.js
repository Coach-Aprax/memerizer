const Jimp = require("jimp");
const isUri = require("is-uri");
const { join } = require("path");
const express = require("express");
const router = express.Router();

const APIConstants = require("../../lib/constants");

// --| Endpoint to "Dogpoop" meme
router.post("/dogpoop", (req, res, next) =>
{
    try
    {
        const ImageBodyParam = req.body.image;

        if(!ImageBodyParam)
        {
            return res.status(400).send({ status: 400, message: APIConstants.ReturnErrorType.ERROR_PROVIDE_IMAGE });
        }

        if(!isUri(ImageBodyParam))
        {
            return res.status(415).send({ status: 415, message: APIConstants.ReturnErrorType.ERROR_INVALID_FILETYPE });
        }

        const ReturnFormat = req.query.format;

        if(!ReturnFormat || !APIConstants.AcceptedReturnFormat.includes(ReturnFormat))
        {
            return res.status(400).send({ status: 400, message: APIConstants.ReturnErrorType.ERROR_INVALID_RETURN_FORMAT });
        }

        const RandomDegrees = Math.floor((Math.random() * 360) + 0);

        APIConstants.Image[0] = Jimp.read(ImageBodyParam);
        APIConstants.Image[1] = Jimp.read(join(__dirname, "../../public/images/dogpoop/dogpoop.png"));

        Promise.all([APIConstants.Image[0], APIConstants.Image[1]]).then((images) =>
        {
            images[0].resize(50, 50).rotate(RandomDegrees).color([{ apply: 'red', params: [160] }]).color([{ apply: 'green', params: [82] }]).color([{ apply: 'blue', params: [45] }]).quality(100);
            images[1].composite(images[0], 186, 249).quality(100).getBuffer(Jimp.AUTO, (err, buffer) =>
            {
                if(err)
                {
                    return res.status(422).send({ status: 422, message: "There was an error creating the meme `Dogpoop` ⚠️" });
                }

                return ReturnFormat === "buffer" ? res.status(200).send(buffer) : res.status(200).send(Buffer.from(buffer, "base64").toString("base64"));
            });

        }).catch(err =>
        {
            if(err)
            {
                return res.status(415).send({ status: 415, message: APIConstants.ReturnErrorType.ERROR_INVALID_FILETYPE });
            }
        });
    }

    catch(err)
    {
        return res.status(500).send({ status: 500, message: err.message });
    }
});

module.exports.router = router;