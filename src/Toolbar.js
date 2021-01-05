import React from 'react';
import logo from './logo.png';
import {TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarFixedAdjust} from '@rmwc/top-app-bar';
import {Button} from '@rmwc/button';
import './Toolbar.css';

export default ({title}) => (
  <>
    <TopAppBar fixed>
      <TopAppBarRow>
        <TopAppBarSection alignStart>
          <img src={logo} alt="eyeson Logo" className="Toolbar-logo" />
          <TopAppBarTitle>{title}</TopAppBarTitle>
        </TopAppBarSection>
        <TopAppBarSection alignEnd>
          <Button
            tag="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/eyeson_team"
            unelevated>
            Twitter
          </Button>
          <Button
            tag="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/eyeson-team"
            unelevated>
            GitHub
          </Button>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
    <TopAppBarFixedAdjust />
  </>
);
