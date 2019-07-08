import React from 'react';
import logo from './logo.png';
import {Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle} from '@rmwc/toolbar';
import {Button} from '@rmwc/button';
import './Toolbar.css';

export default ({title}) => (
  <Toolbar>
    <ToolbarRow>
      <ToolbarSection alignStart>
        <img src={logo} alt="eyeson Logo" className="Toolbar-logo" />
        <ToolbarTitle>{title}</ToolbarTitle>
      </ToolbarSection>
      <ToolbarSection alignEnd>
        <Button
          tag="a"
          target="_blank"
          rel="noopener"
          href="https://twitter.com/eyeson_team"
          unelevated>
          Twitter
        </Button>
        <Button
          tag="a"
          target="_blank"
          rel="noopener"
          href="https://github.com/eyeson-team"
          unelevated>
          GitHub
        </Button>
      </ToolbarSection>
    </ToolbarRow>
  </Toolbar>
);
