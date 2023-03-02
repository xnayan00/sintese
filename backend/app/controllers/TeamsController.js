const TeamsModel = require("../models/TeamsModel")
const ModalitiesModel = require("../models/ModalitiesModel")
const TeachersModel = require("../models/TeachersModel")

module.exports.index = async (req, res) => {
    try {
        const teams = await TeamsModel.find().sort({ createdAt: -1 }).populate('teacher modality')

        if(teams.length == 0) return res.status(200).json({msg: "Nenhum registro encontrado", data: []})
    
        await res.status(201).json({msg: "registros recuperados com sucesso.", data: teams})
    } catch (err) {
        await res.status(500).json(err.message)
    } 
}

module.exports.store = async (req, res) => {
    const data = req.body

    try {
        const storedTeam = await TeamsModel.create(data)
        storedTeam.modality = await ModalitiesModel.findById(storedTeam.modality)
        storedTeam.teacher = await TeachersModel.findById(storedTeam.teacher)
    
        await res.status(201).json({msg: "Registro cadastrado com sucesso.", data: storedTeam})
    } catch (err) {
        await res.status(500).json(err.message)
    }   

}

module.exports.update = async (req, res) => {
    const id = req.params.id
    const data = req.body

    const options = {
        new: true,
        timestamps: {
            updatedAt: true
        }
    }

    try {
        const updatedTeam = await TeamsModel.findByIdAndUpdate(id, data, options)

        if(!updatedTeam) return res.status(404).json({msg: "Registro não encontrado"})
    
        await res.status(201).json({msg: "Registro atualizado com sucesso.", data: updatedTeam})
    } catch (err) {
        await res.status(500).json(err.message)
    }   

}

module.exports.destroy = async (req, res) => {
    const id = req.params.id

    try {
        const deletedTeam = await TeamsModel.findByIdAndDelete(id)
    
        if(!deletedTeam) return res.status(404).json({msg: "Registro não encontrado"})
    
        await res.status(200).json({msg: "Registro excluído com sucesso.", data: deletedTeam})
    } catch (err) {
        await res.status(500).json(err.message)
    }    
}