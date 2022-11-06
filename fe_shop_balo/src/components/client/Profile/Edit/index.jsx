import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { editSchema } from '../../../../adapter/customer';
import { deleteCookie, getCookies } from '../../../../api/Admin/Auth';
import { editCustomer } from '../../../../api/Admin/Customer/customerAPI';
import { setExpiredToken } from '../../../../redux/reducer/auth/auth.reducer';
import { setIsEdit } from '../../../../redux/reducer/customer/customer.reducer';
import { setIsEditProfile } from '../../../../redux/reducer/profile/profile.reducer';
import { formatDate } from '../../../../utils/formatDate';
import { URL_SERVER } from '../../../../utils/urlPath';
import { ErrorToast, SuccessToast } from '../../../commons/Layouts/Alerts';
import ImageCustom from '../../../commons/Layouts/Image';

const ProfileEditClient = (props) => {
  // const customerSelector = useSelector(customerByIdSelector);
  const dataCustomer = 'customerSelector.data;';
  const [imageAvatarCustomerShow, setImageAvatarCustomerShow] = useState(false);
  const [status, setStatus] = useState(dataCustomer.status);
  const data_gender = [
    { value: 1, label: 'Male' },
    { value: 2, label: 'Female' },
  ];
  const data_status = [
    { value: 1, label: 'Active' },
    { value: 0, label: 'Disable' },
  ];
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(editSchema),
    defaultValues: {
      // first_name: dataCustomer.first_name,
      // last_name: dataCustomer.last_name,
      // point: dataCustomer.point,
      // gender: { value: 1, label: dataCustomer.gender },
      // phone: dataCustomer.phone,
      // password: dataCustomer.password,
      // email: dataCustomer.email,
      // avatar: dataCustomer.avatar,
      // address: dataCustomer.address,
      // created_date: dataCustomer.created_date,
      // status: dataCustomer.status,
    },
  });
  const dispatch = useDispatch();

  const backtoManageCustomer = () => {
    dispatch(setIsEditProfile(false));
  };
  // const toBase64 = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // const onSubmit = async (data) => {
  //   // console.log(data)
  //   // BlockUI('#root', 'fixed');
  //   const temDirtyFields = { ...dirtyFields };
  //   Object.keys(temDirtyFields).map((key) => {
  //     if (key === 'gender') temDirtyFields[key] = data[key].label;
  //     else temDirtyFields[key] = data[key];
  //   });
  //   // console.log('dataBefore:', temDirtyFields);
  //   if (temDirtyFields.avatar !== undefined) {
  //     const image = await toBase64(temDirtyFields.avatar);
  //     temDirtyFields.avatar = [image];
  //   }
  //   if (temDirtyFields.created_date !== undefined)
  //     temDirtyFields.created_date = formatDate(temDirtyFields.created_date, 'YYYY-MM-DD');
  //   // console.log('dataAfter:', temDirtyFields);

  //   // const result = await editCustomer(dataCustomer.id, temDirtyFields);
  //   // console.log('Result:',result);
  //   Notiflix.Block.remove('#root');
  //   if (result === 200) {
  //     SuccessToast('Update customer successfully', 3000);
  //     props.backToCustomerList([
  //       {
  //         key: 'updated_at',
  //         value: 'desc',
  //       },
  //     ]);
  //     backtoManageCustomer();
  //   } else if (result === 404) {
  //     ErrorToast('Update customers unsuccessfully', 3000);
  //     Notiflix.Block.remove('#root');
  //   } else if (result === 401) {
  //     handleSetUnthorization();
  //     Notiflix.Block.remove('#root');
  //   } else if (result === 402) ErrorToast('Email or phone numbers have existed!', 3000);
  //   else {
  //     Notiflix.Block.remove('#root');
  //     ErrorToast('Something went wrong. Please try again', 3000);
  //   }
  // };
  const uploadImage = (e) => {
    let image = e.target.files[0];
    if (e.target.files.length > 0) {
      // setImageAvatarCustomerShow(URL.createObjectURL(image));
    }
  };
  // const handleSetUnthorization = () => {
  //   dispatch(setExpiredToken(true));
  //   const token = getCookies('token');
  //   // dispatch(setIsLogin(false));
  //   dispatch(setExpiredToken(true));
  //   if (token) {
  //     deleteCookie('token');
  //   }
  // };
  return (
    <div className="edit_form d-flex justify-content-center">
      <Form className="font_add_edit_prduct text-black" encType="multipart/form-data">
        <h4 className="text-center font-weight-bold mb-3 text-black">Update Profile</h4>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="label-input">First Name</Form.Label>
              <Controller
                control={control}
                name="fisrt_name"
                defaultValue=""
                {...register('first_name', { required: true })}
                ref={null}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.fisrt_name}
                    placeholder="Enter fisrt_name"
                  />
                )}
              />
              <div className="d-flex justify-content-between">
                <small className="text-red font-weight-semi">{errors?.first_name?.message}</small>
              </div>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="label-input">Last Name</Form.Label>
              <Controller
                control={control}
                name="last_name"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.last_name}
                    placeholder="Enter last_name"
                    {...register('last_name', { required: true })}
                  />
                )}
              />
              <div className="d-flex justify-content-between">
                <small className="text-red font-weight-semi">{errors?.last_name?.message}</small>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="label-input">Phone</Form.Label>
              <Controller
                control={control}
                name="phone"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    isInvalid={errors.phone}
                    placeholder="Enter phone"
                    {...register('phone', { required: true, pattern: /^0[3|7|8|9|5]\d{7,8}$/ })}
                  />
                )}
              />
              <div className="d-flex justify-content-between">
                <small className="text-red font-weight-semi">{errors?.phone?.message}</small>
              </div>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="label-input">Email</Form.Label>
              <Controller
                control={control}
                name="email"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control
                    onChange={onChange}
                    value={value}
                    disabled
                    ref={ref}
                    isInvalid={errors.email}
                    placeholder="Enter email"
                    {...register('email', {
                      required: true,
                      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    })}
                  />
                )}
              />
              <div className="d-flex justify-content-between">
                <small className="text-red font-weight-semi">{errors?.email?.message}</small>
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <div className="col-md-12">
            <Form.Group className="mb-2">
              <Form.Label className="label-input">
                Gender &nbsp;<span className="text-danger">*</span>
              </Form.Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={data_gender}
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary25: '#ffffff',
                        primary50: '##3ca9d5',
                        primary: '#3ca9d5',
                      },
                    })}
                  />
                )}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <small className="text-red font-12px">{errors?.gender?.message}</small>
            </div>
          </div>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label className="label-input">Address</Form.Label>
          <Controller
            control={control}
            name="address"
            defaultValue=""
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                type="address"
                isInvalid={errors.address}
                placeholder="Enter address"
              />
            )}
          />
          <div className="d-flex justify-content-between">
            <small className="text-red font-weight-semi">{errors?.address?.message}</small>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label-input">Avatar</Form.Label>
          <Form.Control
            id="avatar"
            type="file"
            onChange={(e) => {
              setValue('avatar', e.target.files[0], { shouldDirty: true });
              uploadImage(e);
            }}
          />
          <div className="d-flex container-avatar">
            <ImageCustom
              src={
                imageAvatarCustomerShow
                  ? imageAvatarCustomerShow
                  : `${URL_SERVER}/storage/customer/${dataCustomer.avatar}`
              }
              className="img-responsive image-avatar"
            />

            {/* <img
              className="img-responsive image-avatar"
              src={
                imageAvatarCustomerShow
                  ? imageAvatarCustomerShow
                  : `${URL_SERVER}/storage/customer/${dataCustomer.avatar}`
              }
              alt={'avatar'}
            /> */}
          </div>
        </Form.Group>

        <div className="d-flex justify-content-end p-2 mt-3">
          <Button
            id="product-save-btn"
            variant="danger"
            type="submit"
            className="font-weight-bold me-3"
            disabled={!isDirty}
          >
            Save
          </Button>
          <Button
            id="product-save-cancel"
            onClick={() => backtoManageCustomer()}
            variant="outline-secondary"
            className="font-weight-bold"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

ProfileEditClient.propTypes = {
  backToCustomerList: PropTypes.func.isRequired,
};

export default ProfileEditClient;
