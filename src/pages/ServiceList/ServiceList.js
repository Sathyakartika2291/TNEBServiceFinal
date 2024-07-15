import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ServiceList() {
    const [serviceList, setServiceList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentService, setCurrentService] = useState(null);

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

    const handleEditClick = (service) => {
        setCurrentService(service);
        setShowModal(true);
    };

    const handleDelete = async (serviceNumber) => {
        try {
            const response = await axios.post('https://localhost:44372/Service/DeleteSerNumById', {
                CRUDType: 4,
                ServiceNumber: serviceNumber,
                ServiceName: '',
                Remarks: '',
                signupid: 0
            });
            if (response.data.success) {
                // Remove the deleted service from the serviceList
                setServiceList(serviceList.filter(service => service.servicenumber !== serviceNumber));
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('An error occurred while deleting the service.');
        }
    };


    const handleClose = () => {
        setShowModal(false);
        setCurrentService(null);
    };

    const handleSave = async () => {
        try {
            const response = await axios.post('https://localhost:44372/Service/UpdateService', {
                ...currentService,
                CRUDType: 5 // Assuming 2 is for update
            });
            if (response.data.success) {
                // Update the serviceList with the updated service
                setServiceList(serviceList.map(service =>
                    service.serviceid === currentService.serviceid ? currentService : service
                ));
                handleClose();
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('An error occurred while saving data.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <h1 className="text-uppercase text-primary text-center p-4">Service List</h1>
            <table className="table table-striped hover">
                <thead>
                    <tr className="text-uppercase">
                        <th>Service ID</th>
                        <th>Service Name</th>
                        <th>Service Number</th>
                        <th>Remarks</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceList.map(service => (
                        <tr key={service.serviceid}>
                            <td>{service.serviceid}</td>
                            <td>{service.servicename}</td>
                            <td>
                                <Link to={`/servicelist/${service.servicenumber}`}>{service.servicenumber}</Link>
                            </td>
                            <td>{service.remarks}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-link area_edit_main"
                                    id="area_edit_main"
                                    
                                >
                                    <div className="row text-center fa-icon_area">
                                        <div className="col-md-3">
                                            <FaEdit onClick={() => handleEditClick(service)}/>
                                        </div>
                                        <div className="col-md-3">
                                            <FaTrash onClick={() => handleDelete(service.servicenumber)} />
                                        </div>
                                    </div>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="serviceName">
                            <Form.Label>Service Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentService?.servicename || ''}
                                onChange={(e) => setCurrentService({ ...currentService, servicename: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="serviceNumber" className="mt-3">
                            <Form.Label>Service Number</Form.Label>
                            <Form.Control
                                type="number"
                                value={currentService?.servicenumber || ''}
                                onChange={(e) => setCurrentService({ ...currentService, servicenumber: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="remarks" className="mt-3">
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentService?.remarks || ''}
                                onChange={(e) => setCurrentService({ ...currentService, remarks: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
