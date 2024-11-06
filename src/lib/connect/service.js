import {db} from "./db.js"

export const getData = async (tbName, limit, offset) => {
    try {
        const [rows] = await db.query(`SELECT * FROM ${tbName} LIMIT ${limit} OFFSET ${offset}`)
        return rows
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getDataWhere = async (tbName, field, record, limit, offset) => {
    try {
        const [rows] = await db.query(`SELECT * FROM ${tbName} WHERE ${field}='${record}' LIMIT ${limit} OFFSET ${offset};`)

        if (rows.length !== 0) {
            return rows
        }
        return false
    } catch (error) {
        console.log(error)
        return false
    }
}
export const getDataEmail = async (email) => {
    try {
        const [rows] = await db.query(`SELECT * FROM user WHERE email='${email}';`)

        if (rows.length !== 0) {
            return rows
        }
        return false
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getDataNew = async (tbName) => {
    try {
        const [rows] = await db.query(`SELECT * FROM ${tbName} ORDER BY `)
    } catch (error) {
        console.log(error)
    }
}

export const addData = async (tbName, values) => {
    try {
        const sql = await db.query(`INSERT INTO ${tbName} VALUES ${values}`)
        return sql[0].insertId
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getDataLike = async (tbName, field, record, limit, offset) => {
    try {
        const [rows] = await db.query(`SELECT * FROM ${tbName} WHERE ${field} LIKE '%${record}%' LIMIT ${limit} OFFSET ${offset}`)
        if (rows.length !== 0) {
            return rows
        }
        return false
    } catch (error) {
        console.log(error)
        return false
    }
}

export const searchData = async (query, limit, offset) => {
    try {
        const [rows] = await db.query(`${query} LIMIT ${limit} OFFSET ${offset}`)
        if (rows.length !== 0) {
            return rows
        }
        return false
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getDataOrderBy = async (tbName, field, limit, offset) => {
    try {
        const [rows] = await db.query(`SELECT id AS barang_id, nama, rating, merk, stock, image, deskripsi, createdAt FROM ${tbName} ORDER BY ${field} DESC LIMIT ${limit} OFFSET ${offset}`)
        return rows
    } catch (error) {
        console.log(error)
        return false
    }
}

export const randomData = async (tbName, limit, offset) => {
    try {
        const [rows] = await db.query(`SELECT id AS barang_id, nama, rating, merk, stock, image, deskripsi, createdAt FROM ${tbName} ORDER BY RAND() LIMIT ${limit} OFFSET ${offset}`)
        return rows
    } catch (error) {
        console.log(error)
        return false
    }
}

export const pagination = async (tbName, limit, page, rowsLength, query) => {
    try {
        const [total] = await db.execute(`SELECT COUNT(*) as count FROM ${tbName} ${query}`)
        const totalItems = total[0].count
        const lastVisiblePage = Math.ceil(totalItems / limit)
        const pagination = {
            lastVisiblePage: lastVisiblePage,
            has_next_page: page < lastVisiblePage,
            items: {
                count: rowsLength,
                total: totalItems,
                per_page: limit
            }
        }
        return pagination
    } catch (error) {
        console.log(error)
    }
}



export const joinTable = async (query) => {
    try {
        const [rows] = await db.query(query)
        if (rows.length !== 0 ) {
            return rows
        }

        return false
    } catch (error) {
        console.log(error)
        return false
    }
}

export const updateData = async (tbName, query) => {
    try {
        const [rows] = await db.query(`UPDATE ${tbName} ${query}`)
        if (rows !== 0) {
            return true
        }
        return false
    } catch (error) {
        console.log(error)
        return false
    }
}

export const deleteData = async (tbName, id) => {
    try {
        const [rows] = await db.query( `DELETE FROM ${tbName} WHERE id=${id}`)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const deleteDataWhere = async (tbName, query) => {
    try {
        const [rows] = await db.query( `DELETE FROM ${tbName} ${query}`)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}