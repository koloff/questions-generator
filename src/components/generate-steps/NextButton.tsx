import {Button} from 'semantic-ui-react';
import React from 'react';

export default (props: { disabled: boolean, onClick: any, loading: boolean }) => {
  return <Button loading={props.loading} onClick={props.onClick} disabled={props.disabled} positive fluid size={'huge'} content='Next' icon='right arrow' labelPosition='right'/>

}