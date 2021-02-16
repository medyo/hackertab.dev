import React from 'react';
import './Page.css';
import { RiArrowLeftFill } from 'react-icons/ri';

export default function DataSourcePage ({ goToPage }) {
    return (
      <div className="Page">
        <h1 className="title">Data sources</h1>
        <p>We collect many data sources to fuel HackerTab and bring content in daily basics</p>
        <p>Hackertab automatically crawls, analyzes, structures and formats the data in a better way.
          Hackertab supports the folling data sources:</p>
        <ul>
          <li>Hackernews</li>
          <li>Stackoverflow Jobs</li>
          <li>devTo</li>
          <li>Conf.tech</li>
          <li>Github Trending</li>
        </ul>
        <button onClick={() => goToPage('home')}><RiArrowLeftFill className="buttonIcon" /> Go Home</button>
      </div>

    )
}