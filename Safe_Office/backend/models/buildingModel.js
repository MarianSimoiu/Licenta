import mongoose from "mongoose";

const buildingSchema = mongoose.Schema({
        address:[{
            city: {
                type: String,
                required: true,
                },
            street: {
                type: String,
                required: true,
            }
        }],
        noFloors:{
            type:Number,
            required: true,
        },
        pic: {
            type: String,
            required: true,
          },
        floors:[{
             floorNo: {
                 type:Number,
                 required:true,
             },
             desks:[{
                cod_space: {
                    type: String,
                    required: true,
                }
             }],
             conferenceRooms:[{
                cod_space:{
                    type: String,
                    required: true,
                },
             }] 
        }]

    })

const Building = mongoose.model("Building", buildingSchema);

 export default Building;