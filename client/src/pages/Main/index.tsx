import { Button, Col, Row, Spinner } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './index.scss';
import { useEffect, useState } from 'react';
import ProductsModal from '../../modals/Products/index';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootAppState } from '../../store';
import { CategoryActions } from '../../store/main/actions/categories';

function Main() {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loaders } = useSelector((state: RootAppState) => state.app);

  useEffect(() => {
    const loadCategories = async () => {
      dispatch(CategoryActions.getCategories());
    };

    loadCategories();
  }, [dispatch]);

  function CategoryList() {
    const list = categories.map(element => {
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
          <Col xs={1} className="icon-block">
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
        {loaders['categories'] && <Spinner className="loader" animation="border" variant="success" />}
        {!loaders['categories'] && CategoryList()}
      </Container>
      {show && <ProductsModal category={category} onHide={() => setShow(false)} />}
    </div>
  );
}

export default Main;
