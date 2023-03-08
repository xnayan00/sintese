const InvoicingsModel = require("../models/InvoicingsModel")

module.exports.index = async (req, res) => {
  const populateObj = {
    path: 'contributor reference',
    populate: {
      strictPopulate: false,
      path: 'modality',
    }
  }
  try {
      const invoicings = await InvoicingsModel.find().sort({ createdAt: -1 }).populate(populateObj)
      
      const total = invoicings.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)

      if(invoicings.length == 0) return res.status(200).json({msg: "Nenhum registro encontrado", data: []})
  
      await res.status(200).json({msg: "registros recuperados com sucesso.", data: {invoicings: invoicings, total: total}})
  } catch (err) {
      await res.status(500).json(err.message)
  } 
}

module.exports.store = async (req, res) => {
    const data = req.body

    try {
        const storedInvoicing = await InvoicingsModel.create(data)
    
        await res.status(201).json({msg: "Registro cadastrado com sucesso.", data: storedInvoicing})
    } catch (err) {
        await res.status(500).json(err.message)
    }

}

module.exports.destroy = async (req, res) => {
    const id = req.params.id

    try {
        const deletedInvoicing = await InvoicingsModel.findByIdAndDelete(id)
    
        if(!deletedInvoicing) return res.status(404).json({msg: "Registro não encontrado"})
    
        await res.status(200).json({msg: "Registro excluído com sucesso.", data: deletedInvoicing})
    } catch (err) {
        await res.status(500).json(err.message)
    }    
}