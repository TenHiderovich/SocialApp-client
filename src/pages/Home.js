import React, { Component } from 'react';
import PropTypes from  'prop-types';

// Components
import ScreamItem from '../components/ScreamItem';
import Profile from '../components/Profile';

import { connect } from 'react-redux';
import { getScreams } from "../redux/actions/dataActions";

import Grid from '@material-ui/core/Grid';

class HomePage extends Component {
    componentDidMount() {
        this.props.getScreams();
    }
    render() {
        const { screams, loading } = this.props.data;
        let recentScreamsMarkup = loading ? (
            screams.map(scream =>
                <ScreamItem key={scream.screamId} scream={scream}/>
            )
        ) : (
            <p>Loading...</p>
        );
        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={3} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

HomePage.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, { getScreams })(HomePage);
