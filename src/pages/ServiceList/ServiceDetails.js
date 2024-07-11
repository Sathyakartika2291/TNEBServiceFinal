import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ServiceDetail() {
    const { servicenumber } = useParams();
    const [parsedTable, setParsedTable] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServiceDetails = async () => {
            try {
                const response = await axios.post('https://localhost:44372/Service/ServiceById', {
                    CRUDType: 3,
                    ServiceNumber: servicenumber,
                    ServiceName: "",
                    Remarks: "",
                    signupid: 0
                });
                if (response.data.success) {
                    setParsedTable(response.data.parsedTable);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchServiceDetails();
    }, [servicenumber]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <h1>Service Detail</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th>Date</th>
                        <th>Entry Date</th>
                        <th>Status</th>
                        <th>Consumptions in Unit</th>
                        <th>Charges</th>
                        <th>Total Charges</th>
                        <th>Amount To Be Paid</th>
                        <th>Amount Paid</th>
                        <th>Receipt No</th>
                    </tr>
                </thead>
                <tbody>
                    {parsedTable.map((item, index) => (
                        <tr key={index}>
                            <td>{item.date1}</td>
                            <td>{item.date2}</td>
                            <td>{item.type}</td>
                            <td>{item.number3}</td>
                            <td>{item.number4}</td>
                            <td>{item.number10}</td>
                            <td>{item.date3}</td>
                            <td>{item.code}</td>
                            <td>{item.date4}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
