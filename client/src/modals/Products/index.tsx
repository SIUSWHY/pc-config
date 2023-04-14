import { useEffect, useState } from 'react';
import { Button, Col, Modal, Row, Spinner } from 'react-bootstrap';
import { ItemType } from '../../types/categories';
import getItemsByCategory from '../../API/getItemsByCategory';
import './index.scss';

function Product(prop: { show: boolean; category: string; onHide: () => void }) {
  const { show, category, onHide } = prop;

  const [productList, setProductList] = useState<ItemType[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setProductList([]);

    const loadProductList = async () => {
      const _products = await getItemsByCategory(category.toLowerCase());

      setProductList(_products);
      setLoading(false);
    };

    loadProductList();
  }, [category]);

  function ProductList() {
    const list = productList.map((element, index) => {
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
    <Modal show={show} onHide={onHide} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">{category}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body-size">
        {isLoading && <Spinner className="loader" animation="border" variant="success" />}
        {ProductList()}
      </Modal.Body>
    </Modal>
  );
}

export default Product;
