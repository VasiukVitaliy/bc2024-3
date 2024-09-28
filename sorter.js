const fs = require("fs");

fs.readFile("response.json", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    let res = [];
    let i = 0;
    let buf = JSON.parse(data);
    while (buf[i]) {
        if (buf[i]["value"] > 5) {
            res.push(buf[i]);
        }
        ++i;
    }

    let res_str = JSON.stringify(res, null, 2); 

    fs.writeFile("data.json", res_str, (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return;
        }

        console.log("Data to data.json have been written");
    });
});
