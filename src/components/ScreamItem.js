import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import whithStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,

  },
  image: {
    minWidth: 200,
    backgroundSize: 'cover',
    backgroundPosition: 'top center'
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

class ScreamItem extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        userImage,
        body,
        createdAt,
        userHandle,
        sreamId,
        likeCount,
        commentCount
      }
    } = this.props;
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
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
            <Typography variant="body1">
              {body}
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default whithStyles(styles)(ScreamItem);
