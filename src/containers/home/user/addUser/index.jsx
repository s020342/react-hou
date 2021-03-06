
/*
 * @Author: songmingjie 
 * @Date: 2019-03-13 13:34:03 
 * @Last Modified by: songmingjie
 * @Last Modified time: 2019-03-17 21:25:23
 */

import React, { Component } from 'react'
import './css/index.css'
import Add from './add' //添加用户
import {connect} from 'dva'

const mapStateToProps = store => {
  window.store = store;
  return { ...store.userShow }
}
@connect(mapStateToProps)

 class Adduser extends Component {
   componentDidMount(){
    this.props.dispatch({ type: 'userShow/getIdentityList' });
   }
  render() {
    const{IdentityList}=this.props;
    //console.log(this.props)
    return (
      <div >
         <Add Identity={IdentityList}></Add>
    </div>
     
    )
  }
}

export default Adduser