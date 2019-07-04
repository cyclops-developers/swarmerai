import React, { Fragment } from 'react';
import { _isEmpty } from '../../util/lodashUtils';
import { P3, P3Strong } from '../../helperModules/Texts';

export const Details = props => (
  <Fragment>
    {props.data
      .filter(deet => !_isEmpty(deet.data))
      .map(deet => (
        <P3 fontSize={3}>
          <P3Strong is="span" mr={5}>{`${deet.text}:`}</P3Strong>
          {deet.data}
        </P3>
      ))}
  </Fragment>
);
