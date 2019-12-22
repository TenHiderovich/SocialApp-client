import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types';
import MyButton from "../util/MyButton";
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';

// MUI stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

// Redux stuff
import {connect} from 'react-redux';
import { getScream } from '../redux/actions/dataActions';

const styles = {
    expandButton: {

    },
    dialogContent: {
        padding: 20
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    closeButton: {
        position: 'absolute',
        right: 8,
        top: 8
    },
    progressSpinnerWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

class ScreamDialog extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
        this.props.getScream(this.props.screamId);
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        const {
            classes,
            scream: {
                screamId,
                body,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                userHandle
            },
            UI: {
                loading
            }
        } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.progressSpinnerWrapper}>
                <CircularProgress size={200}/>
            </div>
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile image" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`users/${userHandle}`}
                        >
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                </Grid>
            </Grid>
        );

        return (
            <Fragment>
                <MyButton
                    tip="Expand scream"
                    onClick={this.handleOpen}
                    tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary"/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <MyButton
                        tip="Close"
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

ScreamDialog.proptype = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
});

const mapActionsToProps = {
    getScream
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));