import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {setFilter} from '../actions.js'

const Link = ({active, children, onClick})=>{
  //children表示被包裹住的子组件
  //其实就是filter.js中Link标签包裹住的其实就是其children
  if(active){
    return <b className="filter selected">{children}</b>
  }else {
    return (
      <a href="#xxx" className="filter not-selected" onClick={(ev) => {
        ev.preventDefault()
        onClick()
      }}>
        {children}
      </a>
    )
  }
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps)=>{
  return {
    active: state.filter===ownProps.filter
  }
}

const mapDispatchToProps = (dispatch, ownProps)=>{
  return {
    onClick: ()=>{
      dispatch(setFilter(ownProps.filter))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Link)