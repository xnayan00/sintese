const OutgoingsModel = require("../models/OutgoingsModel")

module.exports.index = async (req, res) => {
  const populateObj = {
    path: 'receiver team',
    populate: {
      strictPopulate: false,
      path: 'modality'
    },
  }
  try {
      const outgoings = await OutgoingsModel.find().sort({ createdAt: -1 }).populate(populateObj)

      if(outgoings.length == 0) return res.status(200).json({msg: "Nenhum registro encontrado", data: []})
  
      await res.status(200).json({msg: "registros recuperados com sucesso.", data: outgoings})
  } catch (err) {
      await res.status(500).json(err.message)
  } 
}

module.exports.store = async (req, res) => {
    const data = req.body

    try {
        const storedOutgoing = await OutgoingsModel.create(data)
    
        await res.status(201).json({msg: "Registro cadastrado com sucesso.", data: storedOutgoing})
    } catch (err) {
        await res.status(500).json(err.message)
    }

}

module.exports.destroy = async (req, res) => {
    const id = req.params.id

    try {
        const deletedOutgoing = await OutgoingsModel.findByIdAndDelete(id)
    
        if(!deletedOutgoing) return res.status(404).json({msg: "Registro não encontrado"})
    
        await res.status(200).json({msg: "Registro excluído com sucesso.", data: deletedOutgoing})
    } catch (err) {
        await res.status(500).json(err.message)
    }    
}