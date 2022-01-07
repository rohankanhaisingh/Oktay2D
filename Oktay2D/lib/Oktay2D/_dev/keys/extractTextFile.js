const fs = require("fs"),
    path = require("path"),
    url = require("url");

let file = fs.readFileSync(path.join(__dirname, "keys.txt"), { encoding: "utf-8" });

const splittedFormat = file.split("/n");

splittedFormat.forEach(function (key, index) {

    const keyFormation = key.split(":");

    const occuredKey = keyFormation[0],
        keyCode = keyFormation[1];

    console.log(keyFormation);

});