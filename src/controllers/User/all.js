import api from "../../database/api/index.js"

export const all = (req, res) => {
    
    const result = api.select({ table: 'users' })

    res.status(201).json(result)
}