const StudentsModel = require("../models/StudentsModel")

module.exports.index = async (req, res) => {
  const populateObj = {
    path: 'teams.teamId',
    populate: {
      path: 'modality teacher'
    },
  }
  try {
      const students = await StudentsModel.find().sort({ createdAt: -1 }).populate(populateObj)

      if(students.length == 0) return res.status(200).json({msg: "Nenhum registro encontrado", data: []})
  
      await res.status(201).json({msg: "registros recuperados com sucesso.", data: students})
  } catch (err) {
      await res.status(500).json(err.message)
  } 
}

module.exports.store = async (req, res) => {
    const data = req.body

    try {
        const storedStudent = await StudentsModel.create(data)
    
        await res.status(201).json({msg: "Registro cadastrado com sucesso.", data: storedStudent})
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
        const updatedStudent = await StudentsModel.findByIdAndUpdate(id, data, options)

        if(!updatedStudent) return res.status(404).json({msg: "Registro não encontrado"})
    
        await res.status(201).json({msg: "Registro atualizado com sucesso.", data: updatedStudent})
    } catch (err) {
        await res.status(500).json(err.message)
    }   

}

module.exports.destroy = async (req, res) => {
    const id = req.params.id

    try {
        const deletedStudent = await StudentsModel.findByIdAndDelete(id)
    
        if(!deletedStudent) return res.status(404).json({msg: "Registro não encontrado"})
    
        await res.status(200).json({msg: "Registro excluído com sucesso.", data: deletedStudent})
    } catch (err) {
        await res.status(500).json(err.message)
    }    
}