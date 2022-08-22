import logo from './eyeson-logo.svg';
import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarFixedAdjust } from '@rmwc/top-app-bar';
import { Button } from '@rmwc/button';

const Toolbar = ({ title }) => (
  <>
    <TopAppBar fixed>
      <TopAppBarRow>
        <TopAppBarSection alignStart>
          <img src={logo} height="32" alt="eyeson Logo" className="toolbar-logo" />
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

export default Toolbar;
