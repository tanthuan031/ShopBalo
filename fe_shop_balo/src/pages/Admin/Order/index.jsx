import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder } from '../../../api/order/indexAPI';

import { order_table_header } from '../../../asset/data/order_table_header';
import { ErrorToast } from '../../../components/Layouts/Alerts';
import PaginationUI from '../../../components/Layouts/Pagination';
import Skeleton from '../../../components/Layouts/Skeleton';
import { OrderTable } from '../../../components/Order';
import OrderDetail from '../../../components/Order/OrderDetail';
import UpdateStatusOrder from '../../../components/Order/UpdateStatusOrder';
import { isEditStatusOrderSelector, isOrderDetailSelector } from '../../../redux/selectors/order/order.selector';

function OrderPage(props) {
  const data_order_table_header = [...order_table_header];

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [loading, setLoading] = useState(true);
  const [perPage] = useState(10);
  const isUpdateStatus = useSelector(isEditStatusOrderSelector);
  const isOrderDetail = useSelector(isOrderDetailSelector);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  console.log('fr', isOrderDetail);
  useEffect(() => {
    const handleGetAllOrder = async () => {
      const result = await getAllOrder({});
      if (result === 401) {
        return false;
      } else if (result === 500) {
        return false;
      } else {
        setOrder(result, 'reset_page');
      }
      setLoading(false);
    };
    handleGetAllOrder();
  }, [dispatch]);

  const backToOrderList = async (value, action) => {
    setLoading(true);
    if (action === 'edit') {
      console.log('Back to Edit');
    }

    const result = await getAllOrder({
      sort: value,
    });
    setOrder(result, 'page');
    setLoading(false);
  };

  const setOrder = (result, value) => {
    setData(result.data);
    if (value !== 'page') {
      setPage(1);
    }
    setTotalRecord(result.meta.total);
  };
  const handlePageChange = async (page) => {
    setPage(page);
    setLoading(true);
  };
  const handleSearchOrder = async (e) => {
    e.preventDefault();
    if (search !== '') {
      const result = await getAllOrder({
        page: page,
        search,
      });
      if (result === 500 || result === 401) {
        ErrorToast('Something went wrong. Please try again', 3000);
      } else {
        setOrder(result, 'page');
      }
      return;
    }
    const result = await getAllOrder({
      page: page,
    });
    if (result === 500 || result === 401) {
      ErrorToast('Something went wrong. Please try again', 3000);
    } else {
      setOrder(result, 'page');
    }
  };
  return (
    <>
      <section>
        <div className="container-fluid mt-5">
          {!isUpdateStatus && !isOrderDetail ? (
            <h5 className="text-danger font-weight-bold mb-3">Order List</h5>
          ) : isOrderDetail ? (
            <h5 className="text-danger font-weight-bold mb-3">Order Detail</h5>
          ) : (
            <h5 className="text-danger font-weight-bold mb-3">Update Status</h5>
          )}
          {!isUpdateStatus && !isOrderDetail ? (
            <div className="row">
              <div className="d-flex justify-content-end">
                <Form onSubmit={(e) => handleSearchOrder(e)}>
                  <InputGroup>
                    <Form.Control
                      id="search-order"
                      placeholder="Code order or customer"
                      onChange={(e) => setSearch(e.target.value)}
                    />

                    <Button id="search-user" variant="danger" type="submit">
                      <FaSearch />
                    </Button>
                  </InputGroup>
                </Form>
              </div>
            </div>
          ) : (
            ''
          )}
          {!isUpdateStatus && !isOrderDetail ? (
            <div className="row justify-content-center">
              <>
                {!loading ? (
                  <>
                    <OrderTable tableHeader={data_order_table_header} tableBody={data} />

                    {totalRecord > 10 && (
                      <PaginationUI
                        handlePageChange={handlePageChange}
                        perPage={perPage}
                        totalRecord={totalRecord}
                        currentPage={page}
                      />
                    )}
                  </>
                ) : (
                  <Skeleton column={6} />
                )}
              </>
            </div>
          ) : (
            <>
              {isUpdateStatus && <UpdateStatusOrder backToOrderList={backToOrderList} />}
              {isOrderDetail && <OrderDetail dataOrder={data} />}
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default OrderPage;
