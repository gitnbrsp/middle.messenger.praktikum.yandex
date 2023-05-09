const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(__dirname + "/dist"));

app.get('*', function(req, res){
    const path = __dirname + '/dist/index.html'

    if (fs.existsSync(path)) {
        res.sendfile(path);
    } else {
        res.status(200).send('App not built yet');
    }
})

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}!`);
});
