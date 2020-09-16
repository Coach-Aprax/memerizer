<p align="center">
  <img src="https://i.imgur.com/HiaDkDQ.png"><br/>
</p>

<p align="center">
    <a href="https://travis-ci.org/tutyamxx/memerizer"><img src="https://travis-ci.org/tutyamxx/memerizer.svg?branch=master"></a>
</p>

<br />

# Memerizer

* A sad Memerizer API that generates meme pictures on the fly using JavaScript, without the need of saving them to your device!
* It also never writes any data on the machine that is running, everything happens magically on the memory using buffers!
* It returns the picture data type as a `Buffer` or `Base64` string (useful for directly displaying them in a website or on your Discord, Slack, bots or any other IRC channels)
* It has **31** unique endpoints for dank image manipulations 🤘🏽🤪🤘🏽
* Heavily relies on [Jimp](https://github.com/oliver-moran/jimp) and [GraphicsMagick](https://github.com/aheckmann/gm)
* Currently supported data type response formats are: `Buffer` and `Base64`
* Originally, my discord bot used to have these commands, but I thought to transform them into an API, this way other people can easily generate memes with it.
* Thanks to my friend [CoachAprax](https://www.youtube.com/user/freeAEgraphics) for this dank banner

# How to use

* Check out this amazingly documented book [Official Documentation](https://tutyamxx.gitbook.io/memerizer-api-documentation/)

# How to run it locally

* First, install [GraphicsMagick](http://www.graphicsmagick.org/download.html) and [ImageMagick](https://imagemagick.org/script/download.php) on your Operating System
* Clone this repo
* Open the containing folder
* Type `npm i && npm start`
* Open the API in your browser http://localhost:6969/api/v1
* To run the tests (**234** of them actually), type `npm test`

# Usage

* API Request limit is **65** requests per minute per IP, to slightly prevent spamming Heroku
* API Endpoint URL hosted on heroku ➡️ https://memerizer.herokuapp.com/api/v1
* If you get an error while accessing the API endpoints is most likely that I'm out of free monthly Heroku Dyno hours 🤐

# Notes

* Testing works on Windows operating systems as well, but since Travis CI at the moment, has only **beta** Windows environments, **Chocolatey** fails to install some needed VC redistributables.
* If you're using Windows, install needed tools from `#How to run it locally` or use [Chocolatey](https://chocolatey.org/)
* Open an elevated `Windows PowerShell` terminal and type the following commands: `choco install graphicsmagick --force -y` and then `choco install imagemagick.app --force -y`
* All should work fine.