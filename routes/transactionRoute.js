const express = require('express')
const { addTransaction, getAlltransaction, editTransaction, deleteTransaction } = require('../controller/transactionController')

const router = express.Router()

router.post('/addtransaction', addTransaction)
router.post('/gettransaction', getAlltransaction)
router.post('/edittransaction', editTransaction )
router.post('/deletetransaction', deleteTransaction )

module.exports = router