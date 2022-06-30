const { model, Schema } = require("mongoose");

const MySchema = Schema(
    {
        user_ID: { type: Schema.Types.ObjectId, required: [true, "Please fill up"] },
        title: { type: String, require: [true, "Please fill up"] },
        description: { type: String, require: [true, "Please fill up"] },
        images: [{ type: String, required: [true, "Please fill up"] }],
    },
    {
        timestamps: true,
    }
);
module.exports = model("post", MySchema);

