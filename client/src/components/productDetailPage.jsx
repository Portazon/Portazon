import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter} from 'react-router-dom';

const ProductDetail = ({item, addItemToCart}) => {
  //ratings
  let ratingStars = [];

  console.log(item);

  for(let i = 0; i < item._source.rating; i++) {
    ratingStars.push(<span><i className="fa fa-star"></i></span>);
  }

  //thumbnails
  let thumbnails = [];
  let images = item._source.image;
  console.log(images.length);
  for(let i = 0; i < images.length; i++) {
    thumbnails.push(
      <li style={{left: '0px', top: '0px'}}>
        <div className="prod-otherImage">
          <img src={images[i]} role="button" key={i}></img>
        </div>
      </li>
    );
  }

  //prod details
  // let prodDetails = prod.details.map((detail, ind) => <li key={ind}>{detail}</li>);

  //quantity Options
  let quantityOptions = [];
  for(let i=1; i<6; i++ ){
    quantityOptions.push(<option value={i}>{i}</option>);
  }


  let rating = item._source.rating;
  if (rating === null) {
    rating = 'null';
  }

  let save = item._source.retail_price - item._source.discounted_price;


  function includeQuantityInItemToAdd(item) {
    let menu = document.getElementById('detail-quantity');
    let selected = menu.options[menu.selectedIndex].value;
    console.log('selected quantity', selected);
    item.quantity = selected;
    addItemToCart(item);
  }

  return(

    <div className="col-xs-12" style={{padding: '10px'}}>
      <div className="col-xs-7 prod-leftContainer" >
        <div className="prod-detailTitle">
          <h3>{item._source.product_name}</h3>
        </div>
        <div className="prod-secondaryInfo">
          <div className="prod-rating">Customer Rating: {ratingStars} {rating}</div>
          <div className="prod-reviews">

          </div>
        </div>
        <div className="prod-imageContainer">
          <div className="prod-otherImagesCarousel col-xs-3" style={{overflow: 'auto', width: '120px', textAlign: 'center', padding: '10px'}}>
            <ul className="prod-otherImagesList" style={{'marginLeft': '-50px', padding: 'none'}}>
              {thumbnails}
            </ul>
          </div>
          <div className="col-xs-9">
            <div className="prod-productImage">
            <img src={images[0]}></img>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xs-5" style={{paddingRight: '50px', paddingTop: '20px'}}>
        <div className="prod-rightContainer col-xs-12">
          <div className="prod-price">
            <h3 style={{display: 'inline', fontWeight:'600', lineHeight: '1', textTransform: 'uppercase'}}>${item._source.discounted_price}</h3>
            <p style={{margin: '0px 15px', display: 'inline'}}>Was ${item._source.retail_price}</p>
            <p style={{display: 'inline', color: 'red'}}>Save ${save}</p>
          </div>
          <div className="prod-description">
            <h5>Description</h5>
            <ul>
            {limitDescription(item._source.description)}
            </ul>
          </div>
          <div className="prod-quant col-xs-12">
            <div className="col-xs-5 form-group">
              <label className="col-xs-6" style={{fontWeight: 'bold', fontSize:'1.2em'}}>Quantity</label>
              <select id="detail-quantity" style={{padding: '10px', borderRadius: '10px', height:'30px', width: '60px'}}>{quantityOptions}
              </select>
            </div>
            <div className="col-xs-7">
              <button onClick={() => includeQuantityInItemToAdd(item)} type="button" className="btn btn-block" style={{backgroundColor:'#000', color:'White', fontWeight:'bold'}}>ADD TO CART</button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xs-12 prod-related">
        <div className="col-xs-12 prod-relatedHeading"></div>
        <div className="col-xs-12 prod-realtedCarouselContainer">
          <ul className="prod-relatedSliderList"></ul>
        </div>
      </div>
    </div>
  );
}

function limitDescription(description) {
  let desc = description.substring(0, 1000).split('. ');
  return desc.map((item)=><li>{item}</li>)

}


export default ProductDetail;


