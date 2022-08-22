import { useState } from 'react';
import { Card } from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import { FormField } from '@rmwc/formfield';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import { queue } from './Notify.js';
import { getRoomToken } from './utils.js';

const ACCESS_KEY_LENGTH = 24;

const StartForm = props => {

  const [token, setToken] = useState(getRoomToken(ACCESS_KEY_LENGTH));

  const onStart = event => {
    event.preventDefault();
    if (token.length !== ACCESS_KEY_LENGTH) {
      queue.notify({ body: 'Invalid access key', icon: 'warning' });
      return;
    }
    props.onStart(token);
  };

  return (
    <Card id="start" className="page">
      <form onSubmit={onStart}>
        <FormField alignEnd>
          <label htmlFor="input-token">Meeting Access Key</label>
          <TextField
            id="input-token"
            value={token}
            placeholder="rQIKmLQF6jDQUkJw6AFKJELY"
            onChange={({ target }) => setToken(target.value.trim())}
            style={{ width: '20rem' }}
            autoFocus
          />
        </FormField>
        <Typography use="body1" tag="p">Get an user access key from starting a meeting via the API or use one from an active meeting.</Typography>
        <div className="buttons"><Button label="Start" type="submit" unelevated disabled={props.loading} /></div>
      </form>
    </Card>
  );
};

export default StartForm;
