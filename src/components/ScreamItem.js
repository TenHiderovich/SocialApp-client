import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from "../util/MyButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";

// MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import {connect} from 'react-redux';
import {likeScream, unlikeScream} from '../redux/actions/dataActions';

// Icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        position: 'relative'
    },
    image: {
        minWidth: 200,
        backgroundSize: 'cover',
        backgroundPosition: 'top center'
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },
    counter: {
        marginRight: 10
    }
};

class ScreamItem extends Component {
    likedScream = () => {
        const {likes} = this.props.user;
        const {screamId} = this.props.scream;
        return likes && likes.find(like => like.screamId === screamId);
    };

    likeScream = () => {
        const {screamId} = this.props.scream;
        this.props.likeScream(screamId);
    };

    unlikeScream = () => {
        const {screamId} = this.props.scream;
        this.props.unlikeScream(screamId);
    };

    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            scream: {
                userImage,
                body,
                createdAt,
                userHandle,
                screamId,
                likeCount,
                commentCount
            },
            user: {
                authenticated,
                credentials: {handle}
            }
        } = this.props;
        const likeButton = !authenticated ? (
            <MyButton tip="Like">
                <Link to="/login">
                    <FavoriteBorder color="primary"/>
                </Link>
            </MyButton>
        ) : (
            this.likedScream() ? (
                <MyButton tip="Undo like" onClick={this.unlikeScream}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
            ) : (
                <MyButton tip="Like" onClick={this.likeScream}>
                    <FavoriteBorder color="primary"/>
                </MyButton>
            )
        );
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId}/>
        ) : null;
        return (
            <div>
                <Card className={classes.card}>
                    <CardMedia image={userImage} title="Profile image" className={classes.image}></CardMedia>
                    <CardContent className={classes.content}>
                        <Typography
                            variant="h5"
                            component={Link}
                            to={`/users/${userHandle}`}
                            color="primary"
                        >
                            {userHandle}
                        </Typography>
                        {deleteButton}
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).fromNow()}
                        </Typography>
                        <Typography variant="body1">
                            {body}
                        </Typography>
                        {likeButton}
                        <span className={classes.counter}>{likeCount} Likes</span>
                        <MyButton tip="comments">
                            <ChatIcon color="primary"/>
                        </MyButton>
                        <span className={classes.counter}>{commentCount} comments</span>
                        <ScreamDialog screamId={screamId} userHandle={handle}/>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

ScreamItem.proptype = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = {
    likeScream,
    unlikeScream
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamItem));
