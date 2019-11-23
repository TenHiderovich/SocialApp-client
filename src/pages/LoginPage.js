import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppIcon from '../images/monkey.png'
import axios from 'axios';

// MUI stuff
import whithStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
  form: {
    textAlign: 'center'
  },
  image: {
    width: '100px',
    height: '100px',
    margin: '20px auto 20px auto'
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    marginTop: 20
  }
}

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {}
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post('/login', userData)
      .then(res => {
        console.log(res.data);
        this.setState({
          loading: false
        });
        this.props.history.push('/')
      })
      .catch(err => {
        this.setState({
          error: err.response.data,
          loading: false
        });
      })
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="Иконка" className={classes.image}/>
          <Typography  variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit} action="">
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                >
                  Login
                </Button>
            </form>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default whithStyles(styles)(LoginPage);
