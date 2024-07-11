import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ServiceList() {
    const [serviceList, setServiceList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:44372/Service/ServiceList');
                if (response.data.success) {
                    setServiceList(response.data.serviceList);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <h1>Service List</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Service ID</th>
                        <th>Service Name</th>
                        <th>Service Number</th>
                        <th>Remarks</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {serviceList.map(service => (
                        <tr key={service.serviceid}>
                            <td>{service.serviceid}</td>
                            <td>{service.servicename}</td>
                            <td>{service.servicenumber}</td>
                            <td>{service.remarks}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
