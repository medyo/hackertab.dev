import React, { Component } from 'react';
import './CarbonAd.css';

class CarbonAd extends Component {

    componentDidMount() {
        const carbon_wrapper = document.querySelector('.carbon-ad-wrapper');
        const script = document.createElement("script");
        script.src = "https://cdn.carbonads.com/carbon.js?serve=CESDP23I&placement=hackertabdev";
        script.async = true;
        script.id = "_carbonads_js"
        carbon_wrapper.appendChild(script);
    }

    render() {
        return (
            <div className="carbon-ad-wrapper blockRow" />
        );
    }
}

export default CarbonAd;
