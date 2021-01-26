import { Button, Modal } from "react-bootstrap";
export default function MyVerticallyCenteredModal(props) {
    const {
        footer = true
    } = props;
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {props.header && <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.header}
                </Modal.Title>
            </Modal.Header>}
            <Modal.Body>
                {props.children}
            </Modal.Body>
            {
                footer && <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            }
        </Modal>
    );
}