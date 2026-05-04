import Product from '../models/Product.js'
import { BasicController } from './basicController.js'

class ProductController extends BasicController {
  async getProducts(req, res) {
    try {
      const products = await Product.get()
      return this.success(res, 'All products retrieved successfully', products)
    } catch (error) {
      return this.error(res, error.message, 500)
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params
      const product = await Product.find(id)

      if (!product) {
        return this.error(res, 'Product not found', 404)
      }

      return this.success(res, 'Product retrieved successfully', product)
    } catch (error) {
      return this.error(res, error.message, 500)
    }
  }

  async createProduct(req, res) {
    try {
      const data = req.body

      if (!data || Object.keys(data).length === 0) {
        return this.error(res, 'Product data is required', 400)
      }

      const product = await Product.create(data)
      return this.success(res, 'Product created successfully', product, 201)
    } catch (error) {
      return this.error(res, error.message, 500)
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params
      const data = req.body

      if (!data || Object.keys(data).length === 0) {
        return this.error(res, 'Product data is required', 400)
      }

      const product = await Product.update(id, data)

      if (!product) {
        return this.error(res, 'Product not found', 404)
      }

      return this.success(res, 'Product updated successfully', product)
    } catch (error) {
      return this.error(res, error.message, 500)
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params
      const deleted = await Product.delete(id)

      if (!deleted) {
        return this.error(res, 'Product not found', 404)
      }

      return this.success(res, 'Product deleted successfully')
    } catch (error) {
      return this.error(res, error.message, 500)
    }
  }
}

export default new ProductController()
