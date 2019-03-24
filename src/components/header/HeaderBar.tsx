import RootStore from '../../stores/RootStore';
import React from 'react';
import {Menu} from 'semantic-ui-react';

export default class HeaderBar extends React.Component<{ rootStore: RootStore }> {
  render() {
    return (
      <Menu inverted>
        <Menu.Item name='home'/>
        <Menu.Item
          name='Generate'
        />
        <Menu.Item
          name='friends'
        />
      </Menu>
    )
  }
}