import React, { Component } from 'react'
import { connect } from 'react-redux'

class FullLoading extends Component {
    render(){
        const {fullloading} = this.props        
        return fullloading && (
            <div className="full-loading">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30">
                    <rect x="0" y="8.11112" width="4" height="14.7778" fill="#FF6700">
                    <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
                    <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
                    </rect>
                    <rect x="10" y="12.1111" width="4" height="6.77776" fill="#FF6700">
                    <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
                    <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
                    </rect>
                    <rect x="20" y="9.88888" width="4" height="11.2222" fill="#FF6700">
                    <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
                    <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
                    </rect>
                </svg>
        </div>)
    }
}

const mapStateToProps = (state) => {
    const {fullloading} = state.topicApp    
    return { fullloading }
}

export default connect(mapStateToProps)(FullLoading)