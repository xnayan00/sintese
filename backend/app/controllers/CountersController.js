const StudentsModel = require("../models/StudentsModel")
const TeamsModel = require("../models/TeamsModel")
const TeachersModel = require("../models/TeachersModel")
const { subDays } = require('date-fns')

module.exports.index = async (req, res) => {
  try {
      const currentDate = new Date()
      const startDate = subDays(currentDate, 30)
      // const students = await StudentsModel.find().count()

      const teams = await TeamsModel.find()
      const students = await StudentsModel.find()
      const teachers = await TeachersModel.find()

      const studentsLast30Days = await StudentsModel.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startDate,
              $lte: currentDate
            }
          }
        },
      ])


      var studentsByTeam = []

      teams.map(team => {
        students.map(student => {
          student.teams.map(el => {
            if(team._id == el.teamId){
              console.log(team);
            }
          })
        })
      })

      console.log(teams);


      const teamsByTeacher = await TeamsModel.aggregate([
        {
          $group: {
            _id: "$teacher",
            teams: { $push: "$$ROOT" }
          }
        }
      ])



      // const studentsByTeam = await StudentsModel.aggregate([
      //   {
      //     $group: {
      //       _id: "$teams",
      //       teams: { $push: "$$ROOT" }
      //     }
      //   },
      // ])
  
      await res.status(200).json({msg: "registros recuperados com sucesso.", data: {
        studentsLast30Days: studentsLast30Days.length,
        students,
        teams,
        teachers,
        teamsByTeacher,
        studentsByTeam,
      }})
  } catch (err) {
      await res.status(500).json(err.message)
  } 
}