import { useEffect, useState } from 'react';
import { Button, Col, Modal, Row, Spinner } from 'react-bootstrap';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootAppState } from '../../store';
import { ProductActions } from '../../store/main/actions/poducts';

function Product(prop: { category: string; onHide: () => void }) {
  const { category, onHide } = prop;
  const dispatch = useDispatch<AppDispatch>();
  const { products, loaders } = useSelector((state: RootAppState) => state.app);

  const loadProductList = async () => {
    dispatch(ProductActions.getProductsByCategory(category.toLowerCase()));
  };

  useEffect(() => {
    loadProductList();
  }, [category]);

  function ProductList() {
    const list = products.map((element, index) => {
      return (
        <Row className="item" key={index}>
          <Col xs={2}>
            <img className="icon-size" src="http://localhost:10000/categories/cpu-svgrepo-com.svg" alt="component" />
          </Col>
          <Col xs={7} className="info-block">
            <div>{element.model + ' [ ' + element.memoryType + ', ' + element.socket + ' ]'}</div>
            <a href={element.href} target="_blank" rel="noreferrer">
              <span>
                {element.shopBrand +
                  ' .................................................................................................................................................................... ' +
                  element.price +
                  ' P'}
              </span>
            </a>
          </Col>
          <Col className="btn-align">
            <Button className="mt-2" variant="outline-success">
              Includes
            </Button>{' '}
          </Col>
        </Row>
      );
    });

    return list;
  }

  return (
    <Modal show={true} onHide={onHide} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">{category}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body-size">
        {loaders['products'] && <Spinner className="loader" animation="border" variant="success" />}
        {!loaders['products'] && ProductList()}
      </Modal.Body>
    </Modal>
  );
}

export default Product;
