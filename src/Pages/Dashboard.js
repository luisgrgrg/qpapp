import '../App.scss';
import { Card,Button, Container, Col, Row } from 'react-bootstrap'

const Dashboard = () => {


    return (
        <div>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="text-center welcome-card">
                            <Card.Header as="h5">¡Bienvenido a Quality-People!</Card.Header>
                            <Card.Body>
                                <Card.Title>Gestión eficiente de recursos humanos</Card.Title>
                                <Card.Text>
                                    En <strong>Quality-People</strong>, hacemos que la gestión de tus recursos humanos sea más sencilla y eficaz. Centraliza toda tu información, automatiza procesos, y mejora la experiencia tanto para empleados como para gestores.
                                </Card.Text>
                                <Button variant="primary" href='/evaldesem'>Explorar funcionalidades</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Dashboard;