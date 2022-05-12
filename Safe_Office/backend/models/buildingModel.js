import mongoose from "mongoose";

const buildingSchema = mongoose.Schema({
        address:{
            type:String,
            required: true,
        },
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
                deskNo: {
                    type:Number,
                    required: true,
                },
                status:{
                    type:String,
                    required: true,
                }
             }],
             conferenceRooms:[{
                conferenceRoomNo:{
                    type:Number,
                    required: true,
                },
                status:{
                    type:String,
                    required: true,
                }
             }] 
        }]

    })

const Building = mongoose.model("Building", buildingSchema);

 export default Building;