import * as mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'Bocajuniors10',
  database: 'camiondb'
}

const connection = await mysql.createConnection(config);

export class OperationModel {
  static async getAll () {
    const [result] = await connection.query('SELECT *, BIN_TO_UUID(id) AS id FROM operation;');
    console.log(result);
    return result;
  }

  static async getById (id: string) {
    /*if (id) {
      const [result] = await connection.query('SELECT *, BIN_TO_UUID(id) AS id FROM coffee WHERE id = UUID_TO_BIN(?);', [id])
      if (result.length === 0) {
        return null
      }
      return result[0];
    }*/
  }

  static async create (input: string) {
    /*const result = validateCoffee(input)
    if (result.error) {
      return false
    }
    const newCoffee = result.data
    const queryResult = await connection.query('INSERT INTO coffee (id, title, description, image) VALUES (UUID_TO_BIN(UUID()), ?, ?, ?)', [newCoffee.title, newCoffee.description, newCoffee.image])
    return queryResult*/
  }

  static async delete (id: number) {
    /*if (id) {
      connection.query('DELETE FROM coffee WHERE BIN_TO_UUID(id) = ?', [id])
      return true
    } else {
      return false
    }*/
  }

  static async update (title: string, input: string) {
    /*if (title) {
      const [updateCoffee] = await connection.query('SELECT *, BIN_TO_UUID(id) AS id FROM coffee WHERE title = ?', [title])
      if (updateCoffee.length > 0) {
        const toUpdate = {
          ...updateCoffee[0],
          ...input
        }
        connection.query('DELETE FROM coffee WHERE title = ?', [title])
        connection.query('INSERT INTO coffee (id, title, description, image) VALUES (UUID_TO_BIN(?), ?, ?, ?)', [toUpdate.id, toUpdate.title, toUpdate.description, toUpdate.image])
        return toUpdate
      }
      return false
    }
    return false*/
  }
}
