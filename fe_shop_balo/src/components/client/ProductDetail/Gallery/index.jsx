import React, { useLayoutEffect, useRef, useState } from 'react';
import './index.css';
import { FaExpand } from 'react-icons/fa';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Gallery({ listImage }) {

  const listImageProduct=(!!listImage) && listImage.map((item,index) =>(
    {
      id:index, alt: `Picture ${index+1}`, url: item
    }
  ))
  //storage/ProductSlide
  const [imageMain, setImageMain] = useState(0);
  const imgMainProduct=useRef()
  const imgModal=useRef()
  const imgCaption=useRef()
  const imgBtnCloseModal=useRef()
  const imgBtnOpenExpandModal=useRef()
  const imgExpand=useRef()
  const handleExpandImageProduct=()=>{
      imgModal.current.style.display = "block";
      imgExpand.current.src = imgMainProduct.current.src;
      imgCaption.current.innerHTML = imgMainProduct.current.alt;
  }
  const handleCloseExpandImageProduct=()=>{
    imgModal.current.style.display = "none";
  }
  console.log(listImageProduct[imageMain])
  return (
    <div className='p-l-25 p-r-30 p-lr-0-lg'>
      <div className='wrap-slick3 flex-sb flex-w'>
        <div className='wrap-slick3-dots'>
          <ul className='slick3-dots'>
            {
              (!!listImageProduct) &&   listImageProduct.map(item=>(
                <li className={item.id===imageMain?'img-slide-active':''} onClick={()=>setImageMain(item.id)} key={item.id}>
                  <img src={item.url} className='img-slide' alt={item.alt} />
                </li>
              ))
            }
          </ul>
        </div>
        <div className='wrap-slick3-arrows flex-sb-m flex-w'></div>

        <div className='slick3 gallery-lb'>
          <div className='item-slick3' data-thumb='images/product-detail-01.jpg'>
            <div className='wrap-pic-w pos-relative'>
              {
                (!!listImageProduct) &&
                <img src={listImageProduct[imageMain].url} alt={listImageProduct[imageMain].alt} id='imgMainProduct' className= 'image-main-product '  ref={imgMainProduct}/>
              }
              <span className='flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04' ref={imgBtnOpenExpandModal}
              onClick={()=>handleExpandImageProduct()}
              >
                  <FaExpand/>
              </span>
              <div id="myModal" ref={imgModal} className="modal">
                <span className="close"ref={imgBtnCloseModal} onClick={()=>handleCloseExpandImageProduct()}>&times;</span>
                <img className="modal-content" id="img01" ref={imgExpand}/>
                <div id="caption" ref={imgCaption}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );

}
Gallery.propTypes = {
  listImage: PropTypes.array,
  mainImage: PropTypes.string
}

export default Gallery;
