const gm = require("gm").subClass({ imageMagick: true });
const Jimp = require("jimp");
const express = require("express");
const router = express.Router();

const APIConstants = require("../../lib/constants");

// --| Endpoint to "Draw" meme
router.post("/draw", async (req, res, next) =>
{
    try
    {
        if(!req.files)
        {
            return res.status(400).send({ status: 400, message: APIConstants.ReturnErrorType.ERROR_PROVIDE_IMAGE });
        }

        const UploadedPicture = req.files.image;

        if(req.files && !APIConstants.AcceptedImageTypes.includes(req.files.image.mimetype))
        {
            return res.status(415).send({ status: 415, message: APIConstants.ReturnErrorType.ERROR_INVALID_FILETYPE });
        }

        const ReturnFormat = req.query.format;

        if(!ReturnFormat || !APIConstants.AcceptedReturnFormat.includes(ReturnFormat))
        {
            return res.status(400).send({ status: 400, message: APIConstants.ReturnErrorType.ERROR_INVALID_RETURN_FORMAT });
        }

        let Image1 = await Jimp.read(UploadedPicture.data);
        Image1.getBuffer(Jimp.MIME_PNG, (err, buffer) =>
        {
            if(err)
            {
                return res.status(422).send({ status: 422, message: "There was an error creating the meme `Draw` j ⚠️" });
            }

            gm(buffer).border(1, 1).borderColor("black").charcoal(0.1).coalesce().despeckle().autoOrient().toBuffer("draw.png", (err, buffer2) =>
            {
                if(err)
                {
                    return res.status(422).send({ status: 422, message: "There was an error creating the meme `Draw` g ⚠️" });
                }

                ReturnFormat === "buffer" ? res.status(200).send(buffer2) : res.status(200).send(Buffer.from(buffer2, "base64").toString("base64"));
            });
        });
    }

    catch(err)
    {
        return res.status(500).send({ status: 500, message: err.message });
    }
});

module.exports.router = router;