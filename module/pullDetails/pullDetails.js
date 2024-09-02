const { query, sql } = require('../../connection/connection');
var axios = require('axios');

const executeQuery = async (req, res) => {
    try {
        const { userName, pwd } = req.body;
        const result = await query(`SELECT EmpCode, Name FROM HRIS..CMst_EmpOff WHERE EmpCode = '${userName}' and dbo.uf_encode(pwd) = '${pwd}' and isActive = 'Y'`);
        res.status(200).send({ result: result.recordset, status: true, data: [] });
    } catch (error) {
        console.error('Query execution error:', error.message);
        res.status(500).send({ message: "Query execution error", status: false, error: error.message });
    }
};

const InsertDetails = async (req, res) => {
    try {
        const { contributorType, pullType, isbn, loginNo, xmlData } = req.body;

        const queryText = `
            INSERT INTO WMS_Contributors (ContributorType, PullType, Isbn, LoginNo, XMLData, CreatedDate)
            VALUES (@contributorType, @pullType, @isbn, @loginNo, @xmlData, getdate())
        `;

        const params = [
            { name: 'contributorType', type: sql.NVarChar, value: contributorType },
            { name: 'pullType', type: sql.NVarChar, value: pullType },
            { name: 'isbn', type: sql.NVarChar, value: isbn },
            { name: 'loginNo', type: sql.NVarChar, value: loginNo },
            { name: 'xmlData', type: sql.VarChar, value: xmlData }
            // { name: 'createdDate', type: sql.DateTime, value: new Date(createdDate) }
        ];

        await query(queryText, params);

        res.send({ message: 'Record inserted successfully' });
    } catch (error) {
        console.error('Error inserting record:', error);
        res.status(500).send({ error: 'Failed to insert record' });
    }
};

const amtPull = async (req, res) => {
    const { isbn } = req.params;
    const config = {
        method: 'get',
        url: `https://amt-live-api.azurewebsites.net/api/get-chapter-details-bookwise?print_isbn=${isbn}`,
        headers: {}
    };

    try {
        const response = await axios(config);
        res.status(200).send({ data: response.data });
    } catch (error) {
        console.error('Error fetching chapter details:', error);
        throw error;
    }
};

module.exports = { executeQuery, InsertDetails, amtPull };
