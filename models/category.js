import mongoose from 'mongoose'
import crypto from 'crypto'
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  slug: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
})

mongoose.models = {}

const Category = mongoose.model('Category', categorySchema)

export default Category
