import React, { Component } from 'react'
import { connect } from 'react-redux'

class Toast extends Component{
    render(){
        const {show, message, className } = this.props
        return show && (<div className={"toast " + className} >{message}</div>)
    }
}

const mapStateToProps = state => {
    const { toast } = state.topicApp
    return {
        show: toast.show,
        message: toast.message,
        className: toast.className
    }
}

export default connect(mapStateToProps)(Toast)