const { model, Schema } = require("mongoose");

const MySchema = Schema(
    {
        user_ID: { type: Schema.Types.ObjectId, required: [true, "Please fill up"] },
        post_ID: { type: Schema.Types.ObjectId, required: [true, "Please fill up"] },
        message: { type: String, require: [true, "Please fill up"] },
    },
    {
        timestamps: true,
    }
);
module.exports = model("comment", MySchema);

