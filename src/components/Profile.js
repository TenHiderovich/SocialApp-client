import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";

// MUI stuff
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

// Icons
import LocationOn from  "@material-ui/icons/LocationOn";
import LinkIcon from  "@material-ui/icons/Link";
import CalendarToday from  "@material-ui/icons/CalendarToday";
import EditIcon from  "@material-ui/icons/Edit";

// Redux
import {connect} from "react-redux";
import dayjs from "dayjs";

import { logoutUser, uploadImage } from "../redux/actions/userActions";

const styles = {
    paper: {
        width: 300,
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            width: 150,
            height: 150,
            overflow: 'hidden',
            // borderRadius: '50%',
            textAlign: 'center',
            position: 'relative',
            margin: '0 auto',
            '& button': {
                position: 'absolute',
                bottom: 0,
                right: 0,
                opacity: 0
            },
            '&:hover  button': {
                opacity: 1
            }
        },
        '& .profile-image': {
            width: '100%',
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: '#00bcd4'
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
};

class Profile extends Component {
    handleImageChange = (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    };

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    render() {
        const {
            classes,
            user: {
                credentials: { handle, createdAt, imageUrl, bio, website, location },
                loading,
                authenticated
            }
        } = this.props;

        const profileMarkuo = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input
                            type="file"
                            id="imageInput"
                            onChange={this.handleImageChange}
                            hidden="hidden"
                        />
                        <Tooltip title="Edit profile picture" placement="top">
                            <IconButton onClick={this.handleEditPicture} className="button">
                                <EditIcon color="primary"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`users/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr/>
                        { bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>
                        { location &&  (
                            <Fragment>
                                <LocationOn color="primary" /><span>{location}</span>
                                <hr/>
                            </Fragment>
                        )}
                        { website &&  (
                            <Fragment>
                                <LinkIcon color="primary"/>
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr/>
                            </Fragment>
                        )}
                        <CalendarToday color="primary"/>{' '}
                        <span>
                            Joined { dayjs(createdAt).format('MMM YYYY') }
                        </span>
                    </div>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found, please login again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">
                        Signup
                    </Button>
                </div>
            </Paper>
        )) :(<p>loading...</p>);

        return profileMarkuo;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    logoutUser,
    uploadImage
};

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));