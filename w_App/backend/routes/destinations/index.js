//insert
import express from 'express';
import Destination from '../../models/destinationModel/destination.js';

const router = express.Router();


router.route("/add").post((req,res)=>{

    const destination = req.body.destination;
    const description = req.body.description;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    const newDestination = new Destination({
        destination,
        description,
        latitude,
        longitude
    })

    newDestination.save().then(()=>{
        res.json("New Destination Added")
    }).catch((err)=>{
        console.log(err);
    })
})


//read

router.route("/").get((req,res)=>{
    Destination.find().then((destinations)=>{
        res.json(destinations)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route('/:destinationId').get(async (req, res) => {
    let destinationId = req.params.destinationId;
    const destination = await Destination.findById(destinationId)
      .then((destination) => {
        res.status(200).send({ status: 'Destination fetched', destination: destination });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

//update

// router.route("/update/:id").put(async (req,res)=>{
//     let userId = req.params.id;
//     const {name,nic,address,phone,staffId,siteId,email} = req.body;

//     const updateStaff = {
//         name,
//         nic,
//         address,
//         phone,
//         staffId,
//         siteId,
//         email
//     }

//     const update = await Staff.findByIdAndUpdate(userId,updateStaff).then(()=>{
//         res.status(200).send({status: "Updated"})
//     }).catch((err)=>{
//         console.log(err);
//     })  
// })

// //delete

router.route("/deleteDestination/:id").delete(async (req,res)=>{
    let destinationId = req.params.id;

    await Destination.findByIdAndDelete(destinationId).then(()=>{
        res.status(200).send({status: "Delete"})
    }).catch((err)=>{
        console.log(err);
    })  

})

// module.exports = router;
export default router;





