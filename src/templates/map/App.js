import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import cart from "./reducers/cart";

class App extends Component {
  cart_products_done;

  constructor() {
    super();
    this.cart_products_done = [];
  }

  addToCart(prod) {
    console.log(prod.id);
    this.props.onAddToCart(prod.id);
    this.addProductInCart(prod.id);
  }

  addProductInCart(id) {
    this.props.products.find((element) => {
      if (element.id === id) {
        this.cart_products_done.push(element)
      }
    });
  }

  deleteFromCart(deleteFromCart) {
    this.props.onDeleteCart(deleteFromCart.id);
    const index = this.cart_products_done.find(deleteFromCart.id);
    console.log(index)

    if (index > -1) {
      this.cart_products_done.splice(index, 1)
    }
    // this.cart_products_done.splice(deleteFromCart.id, 1)
  }

  render() {
    const {products} = this.props;

    return (
      <div className="wrapper">

        <header className="header">
          <i className="[ icon  icon--grid ]  [ fa  fa-th ]  [ icon ]  active"></i>
          <i className="[ icon  icon--list ]  [ fa  fa-reorder ]  [ icon ]"></i>
        </header>

        <section className="products grid group">

          {
            products.map((prod) =>
              <article
                className="product"
                key={prod.id}
              >
                <div className="product__inner">

                  <section className="product__image">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/159934/pitchblack.jpg"></img>
                  </section>

                  <div className="product__details">

                    <section className="product__name">{prod.title}</section>

                    <section className="product__price">{prod.price} $</section>

                    <section className="product__short-description">
                      {prod.description}
                    </section>

                    <div
                      className="add-to-cart"
                      onClick={this.addToCart.bind(this, prod)}
                    >Add to Cart
                    </div>

                  </div>

                </div>
              </article>
            )
          }

        </section>
        <hr/>
        <section className='cart'>

          {this.cart_products_done.length > 0 && (
            <div className='cart-list'>
              {
                this.cart_products_done.map((cart_item, index) =>

                  <article key={index}>
                    <div className='img-wrapper'>
                      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/159934/pitchblack.jpg"></img>
                    </div>
                    <span>{cart_item.title}</span>
                    <span>{cart_item.price}</span>
                    <button
                      onClick={this.deleteFromCart.bind(this, cart_item)}
                    >x
                    </button>
                  </article>
                )
              }

            </div>
          )}
          {this.cart_products_done.length === 0 && (
            <div className='alert'> Cart is empty</div>
          )}

        </section>

      </div>
    )
  }
}

App.propTypes = {};

export default connect(
  state => ({
    products: state.products,
    cart_products: state.cart
  }),
  dispatch => ({
    onAddToCart: (id) => {
      const payload = {
        id
      };
      dispatch({type: 'ADD_TO_CART', payload})
    },
    onDeleteCart: (id) => {

      dispatch({type: 'DELETE_FROM_CART', payload: id})
    }
  })
)(App)