import {app} from  "./index.js";

app.listen(process.env.PORT, () => {
    console.log("Server running on port 5000");
})