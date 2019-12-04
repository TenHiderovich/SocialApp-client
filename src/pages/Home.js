import React, { Component } from 'react'
import axios from 'axios';

// Components
import ScreamItem from '../components/ScreamItem';
import Profile from '../components/Profile';

import Grid from '@material-ui/core/Grid';

class HomePage extends Component {
  state = {
    screams: null
  };

  componentDidMount() {
    axios.get('/screams')
      .then(res => {
        this.setState({
          screams: res.data
        })
      })
      .catch(err => console.error(err));
  }

  render() {
    let recntScremsMarkup = this.state.screams ? (
      this.state.screams.map(scream => <ScreamItem key={scream.screamId} scream={scream}/>)
    ) : <p>Loading...</p>;
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recntScremsMarkup}
        </Grid>
        <Grid item sm={3} xs={12}>
            <Profile />
        </Grid>
      </Grid>
    )
  }
}

export default HomePage;
