import { Button, Col, Row, Spinner } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './index.scss';
import { useEffect, useState } from 'react';
import getAllCategories from '../../API/getAllCategories';
import { CategoryType } from '../../types/categories';
import ProductsModal from '../../modals/Products/index';

function Main() {
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const _categories = await getAllCategories();

      setCategories(_categories);
      setLoading(false);
    };

    loadCategories();
  }, []);

  function CategoryList() {
    const list = categories.map((element) => {
      return (
        <Row
          key={element.title}
          className="pc-component"
          onClick={() => {
            setCategory(element.title);
            setShow(true);
          }}
        >
          <Col className="title">{element.title}</Col>
          <Col xs={1} className="">
            <img className="mt-2 icon" src={element.icon} alt={element.title.toLowerCase()} />
          </Col>
          <Col xs={6}>
            <div className="empty-data mt-2">
              <div className="empty-line"></div>
              <div className="empty-line"></div>
              <div className="empty-line"></div>
              <div className="empty-line"></div>
            </div>
          </Col>
          <Col className="btn-align">
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
      <Container className="mt-5">
        {isLoading && <Spinner className="loader" animation="border" variant="success" />}
        {CategoryList()}
      </Container>
      <ProductsModal show={show} category={category} onHide={() => setShow(false)} />
    </div>
  );
}

export default Main;
