import { Form, Table, Card,Button, Container, Col, Row } from 'react-bootstrap'
const Evaldesem = () => {

    return (
        <div>
            <Container className="mt-4">
                {/* Motivo Evaluación */}
                <Row className="mb-4">
                    <Col xs={12}>
                        <Card className="p-3">
                            <Form.Group as={Row} controlId="motivoEvaluacion">
                                <Form.Label column sm="2">MOTIVO EVALUACIÓN:</Form.Label>
                                <Col sm="6">
                                    <Form.Select defaultValue="Renovación de Contrato">
                                        <option>Renovación de Contrato</option>
                                        <option>Evaluación Anual</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        </Card>
                    </Col>
                </Row>

                {/* Información Colaborador y Director */}
                <Row className="mb-4">
                    <Col md={3}>
                        <Card className="p-3">
                            <h5>COLABORADOR:</h5>
                            <p>Cargo:</p>
                            <p>Fecha Ingreso:</p>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="p-3">
                            <h5>DIRECTOR:</h5>
                            <p>Cargo DIR:</p>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="p-3">
                            <h5>RANGOS DE CALIFICACIÓN:</h5>
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th>CUANTITATIVOS</th>
                                        <th>CUALITATIVOS</th>
                                        <th>DESCRIPCIÓN</th>
                                    </tr>
                                </thead>
                            </Table>
                        </Card>
                    </Col>
                </Row>

                {/* Tabla Funciones del Cargo */}
                <Row className="mb-4">
                    <Col md={6}>
                        <Card className="p-3">
                            <h5>% Cumplimiento Total</h5>
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th>FUNCIONES DEL CARGO</th>
                                        <th>% Cumplimiento Total</th>
                                        <th>REAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Funciones del Cargo</td>
                                        <td>20%</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>Comp. Organizacionales</td>
                                        <td>10%</td>
                                        <td>0.5</td>
                                    </tr>
                                    <tr>
                                        <td>Aspectos Corporativos</td>
                                        <td>31%</td>
                                        <td>0.5</td>
                                    </tr>
                                    <tr>
                                        <td>Resultado General</td>
                                        <td>61%</td>
                                        <td>3.5</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="p-3">
                            <h5>Funciones del Cargo</h5>
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th>ACTIVIDADES</th>
                                        <th>META</th>
                                        <th>REAL</th>
                                        <th>% CUMPLIMIENTO</th>
                                        <th>REQUIERE PLAN?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Ordenar papeleo</td>
                                        <td>5</td>
                                        <td>5</td>
                                        <td>100%</td>
                                        <td className="bg-success">No</td>
                                    </tr>
                                    {/* Puedes agregar más filas si es necesario */}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>

                {/* Sección de Observaciones y Botón */}
                <Row className="mb-4">
                    <Col md={6}>
                        <Card className="p-3">
                            <h5>¿Se le renovará contrato?</h5>
                            <Form.Group as={Row}>
                                <Col sm="8">
                                    <Form.Select defaultValue="No">
                                        <option>Sí</option>
                                        <option>No</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Observación</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                        </Card>
                    </Col>

                    <Col md={6} className="d-flex align-items-end">
                        <Button variant="dark" className="w-100 py-3">
                            IMPRIMIR PDF PARA FIRMAR Y VALIDAR
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Evaldesem;