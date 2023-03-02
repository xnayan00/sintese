const UsersModel = require("../models/UsersModel")

module.exports.index = async (req, res) => {
    try {
        const users = await UsersModel.find().sort({ createdAt: -1 })

        if(users.length == 0) return res.status(200).json({msg: "Nenhum usuário encontrado", data: []})
    
        await res.status(201).json({msg: "Usuários recuperados com sucesso.", data: users})
    } catch (err) {
        await res.status(500).json(err.message)
    } 
}

module.exports.store = async (req, res) => {
    const data = req.body

    try {
        const storedUser = await UsersModel.create(data)
    
        await res.status(201).json({msg: "Usuário cadastrado com sucesso.", data: storedUser})
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
        const updatedUser = await UsersModel.findByIdAndUpdate(id, data, options)

        if(!updatedUser) return res.status(404).json({msg: "Usuário não encontrado"})
    
        await res.status(201).json({msg: "Usuário atualizado com sucesso.", data: updatedUser})
    } catch (err) {
        await res.status(500).json(err.message)
    }   

}

module.exports.destroy = async (req, res) => {
    const id = req.params.id

    try {
        const deletedUser = await UsersModel.findByIdAndDelete(id)
    
        if(!deletedUser) return res.status(404).json({msg: "Usuário não encontrado"})
    
        await res.status(200).json({msg: "Usuário excluído com sucesso.", data: deletedUser})
    } catch (err) {
        await res.status(500).json(err.message)
    }    
}