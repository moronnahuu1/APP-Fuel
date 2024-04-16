import { QueryResult } from "mysql2"
import { OperationModel } from "src/app/models/mysql/operation"
export class OperationController {

    static async getAll (req: any, res: { json: (arg0: QueryResult) => void }) {
      const coffees = await OperationModel.getAll()
      res.json(coffees)
    }
  
    /*static async getById (req: { params: { id: any } }, res: { json: (arg0: any) => any; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } }) {
      const { id } = req.params
      const coffee = await CoffeeModel.getById(id)
      if (coffee) {
        return res.json(coffee)
      }
      res.status(404).json({ message: 'Coffee not found' })
    }
  
    static async create (req: { body: any }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: any }): void; new(): any } } }) {
      const result = validateCoffee(req.body)
  
      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }
  
      const newCoffee = await CoffeeModel.create(result.data)
  
      res.status(201).json(newCoffee)
    }
  
    static async delete (req: { params: { id: any } }, res: { json: (arg0: { message: string }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } }) {
      const { id } = req.params
      const deleted = CoffeeModel.delete(id)
      if (deleted) {
        res.json({ message: 'Coffee deleted' })
      } else {
        res.status(404).json({ message: 'Coffee not found to delete' })
      }
    }
  
    static async update (req: { body: any; params: { title: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: any }): any; new(): any } }; json: (arg0: any) => any }) {
      const result = validatePartialCoffee(req.body)
      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }
      const { title } = req.params
      const updateCoffee = await CoffeeModel.update(title, result.data)
      return res.json(updateCoffee)
    }*/
  }
  