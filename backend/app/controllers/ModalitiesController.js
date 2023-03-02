const ModalitiesModel = require("../models/ModalitiesModel")

module.exports.index = async (req, res) => {
    try {
        const modalities = await ModalitiesModel.find().sort({ createdAt: -1 })

        if(modalities.length == 0) return res.status(200).json({msg: "Nenhum registro encontrado", data: []})
    
        await res.status(201).json({msg: "registros recuperados com sucesso.", data: modalities})
    } catch (err) {
        await res.status(500).json(err.message)
    } 
}

module.exports.store = async (req, res) => {
    const data = req.body

    try {
        const storedModality = await ModalitiesModel.create(data)
    
        await res.status(201).json({msg: "Registro cadastrado com sucesso.", data: storedModality})
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
        const updatedModality = await ModalitiesModel.findByIdAndUpdate(id, data, options)

        if(!updatedModality) return res.status(404).json({msg: "Registro não encontrado"})
    
        await res.status(201).json({msg: "Registro atualizado com sucesso.", data: updatedModality})
    } catch (err) {
        await res.status(500).json(err.message)
    }   

}

module.exports.destroy = async (req, res) => {
    const id = req.params.id

    try {
        const deletedModality = await ModalitiesModel.findByIdAndDelete(id)
    
        if(!deletedModality) return res.status(404).json({msg: "Registro não encontrado"})
    
        await res.status(200).json({msg: "Registro excluído com sucesso.", data: deletedModality})
    } catch (err) {
        await res.status(500).json(err.message)
    }    
}