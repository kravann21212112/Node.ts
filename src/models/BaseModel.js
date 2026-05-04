class BaseModel {
  constructor() {
    if (new.target === BaseModel) {
      throw new Error('BaseModel is abstract and cannot be instantiated directly')
    }
  }

  static async get() {
    throw new Error(`${this.name} must implement static async get()`)
  }

  static async create() {
    throw new Error(`${this.name} must implement static async create()`)
  }

  static async update() {
    throw new Error(`${this.name} must implement static async update()`)
  }

  static async delete() {
    throw new Error(`${this.name} must implement static async delete()`)
  }

  static async find() {
    throw new Error(`${this.name} must implement static async find()`)
  }
}

export default BaseModel
