import { Button, Col, Modal, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './index.scss';
import { useEffect, useState } from 'react';
import getAllCategories from '../../API/getAllCategories';
import { CategoryType } from '../../types/categories';

function Main() {
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const _categories = await getAllCategories();

      setCategories(_categories);
    };

    loadCategories();
  }, []);

  function CategoryList() {
    const list = categories.map((element, index) => {
      return (
        <Row key={index} className="pc-component" onClick={() => setShow(true)}>
          <Col className="title">{element.title}</Col>
          <Col xs={1} className="">
            <img className={'mt-2'} src={element.icon} alt={element.title.toLowerCase()} />
          </Col>
          <Col xs={6}>
            <div className="empty-data mt-2">
              <div className="empty-line"></div>
              <div className="empty-line"></div>
              <div className="empty-line"></div>
              <div className="empty-line"></div>
            </div>
          </Col>
          <Col>
            <Button className="mt-2" variant="outline-success">
              + Add
            </Button>{' '}
          </Col>
        </Row>
      );
    });

    return list;
  }

  return (
    <div>
      <Container className="mt-5">{CategoryList()}</Container>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">Custom Modal Styling</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde commodi aspernatur enim, consectetur.
            Cumque deleniti temporibus ipsam atque a dolores quisquam quisquam adipisci possimus laboriosam. Quibusdam
            facilis doloribus debitis! Sit quasi quod accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum deleniti rem!
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Main;
