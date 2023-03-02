const TeachersModel = require("../models/TeachersModel")

module.exports.index = async (req, res) => {
    try {
        const teachers = await TeachersModel.find().sort({ createdAt: -1 })

        if(teachers.length == 0) return res.status(200).json({msg: "Nenhum registro encontrado", data: []})
    
        await res.status(201).json({msg: "registros recuperados com sucesso.", data: teachers})
    } catch (err) {
        await res.status(500).json(err.message)
    } 
}

module.exports.store = async (req, res) => {
    const data = req.body

    try {
        const storedTeacher = await TeachersModel.create(data)
    
        await res.status(201).json({msg: "Registro cadastrado com sucesso.", data: storedTeacher})
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
        const updatedTeacher = await TeachersModel.findByIdAndUpdate(id, data, options)

        if(!updatedTeacher) return res.status(404).json({msg: "Registro não encontrado"})
    
        await res.status(201).json({msg: "Registro atualizado com sucesso.", data: updatedTeacher})
    } catch (err) {
        await res.status(500).json(err.message)
    }   

}

module.exports.destroy = async (req, res) => {
    const id = req.params.id

    try {
        const deletedTeacher = await TeachersModel.findByIdAndDelete(id)
    
        if(!deletedTeacher) return res.status(404).json({msg: "Registro não encontrado"})
    
        await res.status(200).json({msg: "Registro excluído com sucesso.", data: deletedTeacher})
    } catch (err) {
        await res.status(500).json(err.message)
    }    
}