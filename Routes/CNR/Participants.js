const express = require("express")
const router = express.Router()
const Participant = require('../../Models/CNR/Participant')

//get all
router.get('/', getAllParticipants, (req, res) => {
        res.send(res.participants)
    })

//get one 
router.get('/:id', getParticipantById ,(req, res) => {
    res.send(res.participant)
})

//create one
router.post('/', async (req, res) => {
    const participant = new Participant({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName
    })
    try{
        const participants = await participant.save()
        res.status(201).json(participants)
    } catch (err) {
        res.status(400).json({message : err.message})
    }
})

//update one 
router.patch('/:id', getParticipantById, async (req,res) => {
    try {
        res.participant.set(req.body)
        const updatedParticipant = await res.participant.save()
        res.json(updatedParticipant)
    } catch (err) {
        res.status(400).json({message : err.message})
    }
})

//delete one
router.delete('/:id', getParticipantById, async (req,res) => {
    try {
        await res.participant.deleteOne()
        res.json({message: 'Deleted participant'})
    } catch (err) {
        res.status(500).json({message : err.message})
    }
})

async function getParticipantById(req,res,next){
    let participant
    try {
        participant = await Participant.findById(req.params.id)
        if(participant == null){
            return res.status(404).json({message: 'Cannot find participant'})
        }
    } catch (error) {
        return res.status(500).json({message: err.message})
    }

    res.participant = participant
    next()
}

async function getAllParticipants(req,res,next){
    let participants
    try{
        participants = await Participant.find()
        if(participants == null){
            return res.status(404).json({message: 'No participants'})
        }
    } catch (err) {
        res.status(500).json({message : err.message})
    }
    res.participants = participants
    next()
}




module.exports = router