import { useState } from 'react';
import { Form, Table, Card, Button, Container, Col, Row, Modal } from 'react-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Evaldesem = () => {
    // Estado para la cédula, motivo de evaluación y datos del colaborador
    const [cedula, setCedula] = useState('');
    const [colaborador, setColaborador] = useState(null);
    const [motivoEvaluacion, setMotivoEvaluacion] = useState('');
    const [motivosDisponibles, setMotivosDisponibles] = useState([]);
    const [evaluacionSeleccionada, setEvaluacionSeleccionada] = useState(null);
    const [funcionesSeleccionadas, setFuncionesSeleccionadas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);  // Estado para controlar el modal
    const [selectedFunction, setSelectedFunction] = useState(null); // Función seleccionada para el plan de acción
    const [planAccion, setPlanAccion] = useState('');  // Texto del plan de acción

    // Datos de prueba (simula la información de la base de datos para colaboradores)
    const colaboradores = [
        {
            cedula: '123456789',
            nombre: 'Juan Pérez',
            cargo: 'Analista',
            fechaIngreso: '01/01/2020',
            director: 'Carlos Martínez',
            cargoDirector: 'Gerente',
            evaluaciones: [
                { evaluacion: 'Funciones del Cargo', cumplimiento: '20%', real: 1 },
                { evaluacion: 'Comp. Organizacionales', cumplimiento: '60%', real: 3 },
                { evaluacion: 'Aspectos Corporativos', cumplimiento: '20%', real: 0 },
                { evaluacion: 'Resultado General', cumplimiento: '80%', real: 4 }
            ],
            funciones: [
                { evaluacion: 'Funciones del Cargo', actividad: 'Ordenar papeleo', meta: 5, real: 5, cumplimiento: '100%', requierePlan: 'No' },
                { evaluacion: 'Comp. Organizacionales', actividad: 'Asistir a reuniones', meta: 5, real: 3, cumplimiento: '80%', requierePlan: 'No' }
            ]
        },
        {
            cedula: '987654321',
            nombre: 'Ana Gómez',
            cargo: 'Coordinadora',
            fechaIngreso: '15/03/2018',
            director: 'Luis Vargas',
            cargoDirector: 'Director General',
            evaluaciones: [
                { evaluacion: 'Funciones del Cargo', cumplimiento: '50%', real: 2.5 },
                { evaluacion: 'Comp. Organizacionales', cumplimiento: '30%', real: 0 },
                { evaluacion: 'Aspectos Corporativos', cumplimiento: '20%', real: 0.8 },
                { evaluacion: 'Resultado General', cumplimiento: '70%', real: 3.3 }
            ],
            funciones: [
                { evaluacion: 'Funciones del Cargo', actividad: 'Supervisar equipo', meta: 5, real: 5, cumplimiento: '100%', requierePlan: 'No' },
                { evaluacion: 'Funciones del Cargo', actividad: 'Reparar equipos', meta: 5, real: 5, cumplimiento: '100%', requierePlan: 'No' },
                { evaluacion: 'Aspectos Corporativos', actividad: 'Evaluar desempeño', meta: 5, real: 4, cumplimiento: '80%', requierePlan: 'No' }
            ]
        }
    ];

    // Datos de prueba para los motivos de evaluación por cédula
    const motivosEvaluacionData = {
        '123456789': ['Renovación de Contrato', 'Evaluación Anual'],
        '987654321': ['Evaluación Anual', 'Evaluación por Desempeño']
    };

    // Función para buscar el colaborador por la cédula
    const buscarColaborador = () => {
        const resultado = colaboradores.find(colab => colab.cedula === cedula);
        if (resultado) {
            setColaborador(resultado);
            setMotivosDisponibles(motivosEvaluacionData[cedula] || []);
        } else {
            setColaborador(null); // Si no encuentra, limpiamos los datos
            setMotivosDisponibles([]); // Limpiar motivos si no hay colaborador
        }
    };

    // Función para manejar la selección de una evaluación
    const manejarSeleccionEvaluacion = (evalItem) => {
        setEvaluacionSeleccionada(evalItem);
        // Filtrar las funciones que pertenecen a la evaluación seleccionada
        const funcionesParaEvaluacion = colaborador.funciones.filter(func => func.evaluacion === evalItem.evaluacion);
        setFuncionesSeleccionadas(funcionesParaEvaluacion); // Actualiza el estado con las funciones filtradas
    };

    // Función para manejar el cambio en "Requiere Plan?"
    const manejarCambioPlan = (funcItem, valor) => {
        if (valor === 'Sí') {
            setSelectedFunction(funcItem);
            setModalVisible(true);  // Mostrar el modal
        }
    };

    // Función para manejar el cierre del modal
    const cerrarModal = () => {
        setModalVisible(false);
        setPlanAccion('');
    };

    // Función para guardar el plan de acción
    const guardarPlanAccion = () => {
        if (selectedFunction) {
            console.log(`Plan de acción para ${selectedFunction.actividad}: ${planAccion}`);
        }
        cerrarModal();
    };

    // Función para generar el PDF
    const generarPDF = () => {
        const input = document.getElementById('pdfContent');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // Width of A4 in mm
            const pageHeight = 297; // Height of A4 in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('evaluacion_desempeno.pdf');
        });
    };

    // Mostrar el contenido completo solo si se ha seleccionado tanto la cédula como el motivo de evaluación
    const mostrarContenidoCompleto = colaborador && motivoEvaluacion;

    return (
        <div>
            <Container className="mt-4">
                {/* Tarjeta de Colaborador */}
                <Row className="mb-4">
                    <Col xs={12} md={6}>
                        <Card className="p-3">
                            <h5>Buscar Colaborador</h5>
                            <Form.Group controlId="cedula">
                                <Form.Label>Cédula:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese la cédula"
                                    value={cedula}
                                    onChange={(e) => setCedula(e.target.value)}
                                />
                            </Form.Group>
                            <Button className="mt-3" onClick={buscarColaborador}>
                                Buscar
                            </Button>
                        </Card>
                    </Col>

                    {/* Selección de Motivo de Evaluación */}
                    {colaborador && (
                        <Col xs={12} md={6}>
                            <Card className="p-3">
                                <h5>Motivo de Evaluación</h5>
                                <Form.Group controlId="motivoEvaluacion">
                                    <Form.Label>Motivo de Evaluación:</Form.Label>
                                    <Form.Select
                                        value={motivoEvaluacion}
                                        onChange={(e) => setMotivoEvaluacion(e.target.value)}
                                    >
                                        <option value="">Seleccione un motivo</option>
                                        {motivosDisponibles.map((motivo, idx) => (
                                            <option key={idx} value={motivo}>{motivo}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Card>
                        </Col>
                    )}
                </Row>

                {/* Mostrar el contenido solo si se seleccionaron la cédula y el motivo de evaluación */}
                {mostrarContenidoCompleto && (
                    <div id="pdfContent">
                        {/* Información Colaborador y Director */}
                        <Row className="mb-4">
                            <Col md={3}>
                                <Card className="p-3">
                                    <h5>COLABORADOR:</h5>
                                    <p>Cargo: {colaborador.cargo}</p>
                                    <p>Fecha Ingreso: {colaborador.fechaIngreso}</p>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card className="p-3">
                                    <h5>DIRECTOR:</h5>
                                    <p>{colaborador.director}</p>
                                    <p>Cargo DIR: {colaborador.cargoDirector}</p>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="p-3">
                                    <h5>RANGOS DE CALIFICACIÓN:</h5>
                                    <div className="table-responsive">
                                        <Table bordered>
                                            <thead>
                                                <tr>
                                                    <th>CUANTITATIVOS</th>
                                                    <th>CUALITATIVOS</th>
                                                    <th>DESCRIPCIÓN</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>80%</td>
                                                    <td>20%</td>
                                                    <td>Evaluación del desempeño anual</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card>
                            </Col>
                        </Row>

                        {/* Tabla Funciones del Cargo */}
                        <Row className="mb-4">
                            <Col xs={12} md={6}>
                                <Card className="p-3">
                                    <h5>Evaluaciones</h5>
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>EVALUACIÓN</th>
                                                <th>% Cumplimiento Total</th>
                                                <th>REAL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {colaborador.evaluaciones.map((evalItem, idx) => (
                                                <tr key={idx} onClick={() => manejarSeleccionEvaluacion(evalItem)} style={{ cursor: 'pointer' }}>
                                                    <td>{evalItem.evaluacion}</td>
                                                    <td>{evalItem.cumplimiento}</td>
                                                    <td>{evalItem.real}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card>
                            </Col>

                            {/* Tabla de Funciones del Cargo */}
                            <Col xs={12} md={6}>
                                <Card className="p-3">
                                    <h5>{evaluacionSeleccionada ? evaluacionSeleccionada.evaluacion : 'Seleccione una Evaluación'}</h5>
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
                                            {funcionesSeleccionadas.length > 0 ? (
                                                funcionesSeleccionadas.map((funcItem, idx) => (
                                                    <tr key={idx}>
                                                        <td>{funcItem.actividad}</td>
                                                        <td>{funcItem.meta}</td>
                                                        <td>{funcItem.real}</td>
                                                        <td>{funcItem.cumplimiento}</td>
                                                        <td>
                                                            <Form.Select
                                                                value={funcItem.requierePlan}
                                                                disabled={funcItem.meta > 4}
                                                                onChange={(e) => manejarCambioPlan(funcItem, e.target.value)}
                                                            >
                                                                <option>No</option>
                                                                <option>Sí</option>
                                                            </Form.Select>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">
                                                        No hay datos disponibles
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                )}

                {/* Sección de Observaciones y Botón */}
                {mostrarContenidoCompleto && (
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
                            <Button variant="dark" className="w-100 py-3" onClick={generarPDF}>
                                IMPRIMIR PDF PARA FIRMAR Y VALIDAR
                            </Button>
                        </Col>
                    </Row>
                )}

                {/* Modal para el Plan de Acción */}
                <Modal show={modalVisible} onHide={cerrarModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Plan de Acción</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="planAccion">
                            <Form.Label>Descripción del Plan de Acción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={planAccion}
                                onChange={(e) => setPlanAccion(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cerrarModal}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={guardarPlanAccion}>
                            Guardar Plan
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
}

export default Evaldesem;