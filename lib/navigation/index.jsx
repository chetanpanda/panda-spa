import './style.scss'

import {
  Button
, Container
, Dropdown
, Grid
, Image
, Menu
, Segment
} from 'semantic-ui-react'
import CtrlComponent from 'ctrl-react-component'
import Player from 'react-player'
import React from 'react'

class Navigation extends CtrlComponent {
  renderFiltered() {
    const {
      context
    , props
    } = this

    const {router} = context
    const {isLogoDark} = props

    const video = props.video
      ? <div className='player-container'>
          <Player
            playing
            height='56.25vw'
            width='100%'
            url={props.video}
          />
        </div>
      : null

    return (
      <Segment
        basic
        className='navigation'
        style={Object.assign({
          backgroundImage: `url(${props.cover})`
        , backgroundPosition: 'center'
        , backgroundSize: 'cover'
        , height: props.video ? '56.25vw' : null
        , marginBottom: 0
        }, props.style)}
      >
        <div className='navigation-overlay'/>
        <Container className='navigation-container'>
          <Menu borderless size='huge' secondary inverted>
            <Menu.Item>
              <Image
                size='mini'
                src={
                  isLogoDark
                    ? this.getContent('logoDark.url')
                    : this.getContent('logo.url')
                }
              />
            </Menu.Item>
            <Grid className='computer only'>
              <Menu.Item
                link
                onClick={() => router.updateRoute('/about')}
              >About</Menu.Item>
              <Menu.Item
                link
                onClick={() => router.updateRoute('/issues')}
              >Issues</Menu.Item>
            </Grid>
            <Menu.Menu position='right'>
              <Grid className='computer only'>
                <Menu.Item>
                  <Button
                    as='a'
                    color='blue'
                    compact
                    href='http://eepurl.com/cVtGir'
                  >Join Us</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button
                    as='a'
                    color='orange'
                    compact
                    href='https://secure.actblue.com/donate/panda2018'
                  >Donate</Button>
                </Menu.Item>
              </Grid>
              <Grid className='mobile only'>
                <Dropdown
                  className={isLogoDark ? 'dropdown-dark' : 'dropdown-light'}
                  icon='content'
                  simple
                  text=' '
                  options={[
                    {
                      text: 'About'
                    , value: '/about'
                    }
                  , {
                      text: 'Issues'
                    , value: '/issues'
                    }
                  , {
                      text: 'Join Us'
                    , value: 'http://eepurl.com/cVtGir'
                    }
                  , {
                      text: 'Donate'
                    , value: 'https://secure.actblue.com/donate/panda2018'
                    }
                  ]}
                  onChange={(event, {value} = {}) => {
                    if (value.charAt(0) === '/') {
                      return router.updateRoute(value)
                    }

                    return document.location.href = value
                  }}
                />
              </Grid>
            </Menu.Menu>
          </Menu>
          {props.children}
        </Container>
        {video}
      </Segment>
    )
  }
}

export default Navigation
