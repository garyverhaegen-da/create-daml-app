import React from 'react';
import { Container, Grid, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import PartyListEdit from './PartyListEdit';
import UserList from './UserList';
import { User } from '../daml/create-daml-app/User';
import { Party } from '@digitalasset/daml-json-types';

export type Props = {
  myUser: User | null;
  allUsers: User[];
  onAddFriend: (friend: Party) => Promise<boolean>;
  onRemoveFriend: (friend: Party) => Promise<void>;
  onReload: () => void;
}

/**
 * React component for the view of the `MainScreen`.
 */
const MainView: React.FC<Props> = (props) => {
  return (
    <Container>
      <Grid centered columns={2}>
        <Grid.Row stretched>
          <Grid.Column>
            <Header as='h1' size='huge' color='blue' textAlign='center' style={{padding: '1ex 0em 0ex 0em'}}>
                {props.myUser ? `Welcome, ${props.myUser.party}!` : 'Loading...'}
            </Header>

            <Segment>
              <Header as='h2'>
                <Icon name='user' />
                <Header.Content>
                  {props.myUser?.party ?? 'Loading...'}
                  <Header.Subheader>Me and my friends</Header.Subheader>
                </Header.Content>
              </Header>
              <Divider />
              <PartyListEdit
                parties={props.myUser?.friends ?? []}
                onAddParty={props.onAddFriend}
                onRemoveParty={props.onRemoveFriend}
              />
            </Segment>
            <Segment>
              <Header as='h2'>
                <Icon name='globe' />
                <Header.Content>
                  The Network
                  <Icon
                    link
                    name='sync alternate'
                    size='small'
                    style={{marginLeft: '0.5em'}}
                    onClick={props.onReload}
                  />
                  <Header.Subheader>Others and their friends</Header.Subheader>
                </Header.Content>
              </Header>
              <Divider />
              <UserList
                users={props.allUsers}
                action={{
                  icon: 'add user',
                  onClick: props.onAddFriend
                }}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default MainView;
