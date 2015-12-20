"use strict";

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cp = require("child_process");

const MAPPING = {
  "git@code.ipd.kit.edu:pgrep/pgrep.git": "git@bitbucket.org:FlorianLoch/pgrep_mirror.git"
};

app.use(bodyParser.json());

app.post("/gitmirror", (req, res) => {
  let origin;
  console.log(req.body);
  if (req.body && req.body.repository && req.body.repository.url) {
    origin = req.body.repository.url;

    let target = MAPPING[origin];

    if (target) {
      let pair = "'" + origin + "' to '" + target + "'";
      console.log("Going to process mirroring-request: " + pair);
      cp.fork("./mirrorWorker.js", [origin, target]).on("exit", (code) => {
        console.log("Done with " + pair + " (Code: " + code + ")");
      });
    }
    else {
      console.log("Application isn't configured for origin '" + origin + "'");
    }
  }
  else {
    console.log("Request received, but it didn't contain valid information.")
  }

  res.send("OK");
});

app.listen(32320, () => {
  console.log("git-mirror now listening on port 32320...");
});
