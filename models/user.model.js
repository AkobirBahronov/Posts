const { model, Schema } = require("mongoose");

const MySchema = Schema(
    {
        username: { type: String, required: [true, "Please fill up"] },
        email: { type: String, required: [true, "Please fill up"] },
    },
    {
        timestamps: true,
    }
);
module.exports = model("user", MySchema);
