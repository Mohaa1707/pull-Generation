// const { query, sql } = require('../../connection/connection');

// const InsertDetails = async (req, res) => {
//     try {
//         const { contributorType, pullType, isbn, loginNo, xmlData } = req.body;

//         const queryText = `
//             INSERT INTO WMS_Contributors (ContributorType, PullType, Isbn, LoginNo, XMLData, CreatedDate)
//             VALUES (@contributorType, @pullType, @isbn, @loginNo, @xmlData, getdate())
//         `;

//         const params = [
//             { name: 'contributorType', type: sql.NVarChar, value: contributorType },
//             { name: 'pullType', type: sql.NVarChar, value: pullType },
//             { name: 'isbn', type: sql.NVarChar, value: isbn },
//             { name: 'loginNo', type: sql.NVarChar, value: loginNo },
//             { name: 'xmlData', type: sql.VarChar, value: xmlData }
//             // { name: 'createdDate', type: sql.DateTime, value: new Date(createdDate) }
//         ];

//         await query(queryText, params);

//         res.send({ message: 'Record inserted successfully' });
//     } catch (error) {
//         console.error('Error inserting record:', error);
//         res.status(500).send({ error: 'Failed to insert record' });
//     }
// };

// module.exports = { InsertDetails };
