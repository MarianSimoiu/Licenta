import mongoose from "mongoose";

const requestSchema = mongoose.Schema({

        user: {
            type: mongoose.Schema.Types.ObjectId,
        required: true,
             ref: "User",
          },
          status:{
            type: Boolean,
            default: false,
            required: true,
          },
          vaccinationDate: {
            type: Date,
            },
          dcc:{
            type: String,
            required: true,
          }
        })
       
const Request = mongoose.model("Request", requestSchema);

 export default Request;