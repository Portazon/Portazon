  import React from 'react';
  import ReactDOM from 'react-dom';


  import CategoryList from './categoryList.jsx';

  var axios = require('axios');

  class Header extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        query: '',
        searchedItems: ''
      }
      this.submitQuery = this.submitQuery.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.changeViewToCart = this.changeViewToCart.bind(this);
    }

    changeViewToCart(){
      let changeView = this.props.changeView;
      changeView('shoppingCart');
    }

    populateCategoriesMenu(){

    }

    submitQuery() {
      let q = this.state.query;
      axios.get('search/?q=' + q)
        .then(res => {
          console.log('in then for submit query', res)
          this.setState({searchItems: res.data});
        })
    }

    handleChange(e) {
      this.setState({query: e.target.value});
    }


    render() {
      // console.log('query in header', this.state.query)
      return (
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">

            {/* Logo */}
            <div className="navbar-header" id="logo">
              <a className="navbar-brand" href="#">PORTAZON</a>
            </div>

            {/* category menu */}
            <ul className="nav navbar-nav">
              <li className='dropdown'>
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Shop By <span className="caret"></span></a>
                  <CategoryList></CategoryList>
              </li>
            </ul>


          {/* search bar */}
             <ul className="nav navbar-nav" style={{width: '50%'}}>
               <div className="input-group" style={{paddingTop: '10px'}}>
                 <input onChange={e => this.handleChange(e)} type = "text" className ="form-control" placeholder="Search for something fun ..." />
                 <div onClick={this.submitQuery} className="input-group-addon">
                   <span className="glyphicon glyphicon-search"></span>
                 </div>
                </div>
             </ul>

           {/* user account */}
          <ul className="nav navbar-nav navbar-right">
          <li><button onClick={this.changeViewToCart}><span className="glyphicon glyphicon-shopping-cart" style={{'fontSize': '1.5em'}}></span></button></li>
               <li className="dropdown">
                 <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-user" style={{'fontSize': '1.5em'}}></span></a>
                 <div className="dropdown-menu">
                   <div className="header-account-dropdown">
                      <h3 style={{color: '#fff'}}>Login</h3>
                   </div>
                   <form method="post" action="/account/login" className='header-account-dropdown'>
                     <div className="form-group ">
                       <input type="email" className="form-control"placeholder="Email"/>
                     </div>
                     <div className="form-group">
                       <input type="password" className="form-control" placeholder="Password"/>
                     </div>
                     <button type="submit" className="btn btn-block">SIGN IN</button>
                   </form>
                   <div className="header-account-dropdown">
                     <a href="#">Create Account</a>
                     <a href="#">Forgot Password?</a>
                   </div>
                 </div>
               </li>
             </ul>
          </div>
        </nav>
      );
    }
  }

export default Header