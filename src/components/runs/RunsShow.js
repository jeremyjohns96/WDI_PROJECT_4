import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

// import BackButton from '../utility/BackButton';
import GoogleMap from '../utility/GoogleMap';
// import Auth from '../../lib/Auth';

class RunsShow extends React.Component {
  state = {
    shape: {},
    run: []
  }

  componentWillMount() {
    Axios
      .get(`/api/runs/${this.props.match.params.id}`)
      .then(res => this.setState({ run: res.data }))
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
        console.log(err);
      });


  }

  // deleteUser = () => {
  //   Axios
  //     .delete(`/api/shapes/${this.props.match.params.id}`)
  //     .then(() => this.props.history.push('/'));
  // }

  render() {
    console.log(this.state.run);
    return (
      <div className="row">
        <div className="container">
          <div className="col-md-6 runs-show-left">
            { this.state.run.summary_polyline && <div>
              <h3>{this.state.run.shape.name}</h3>,
              <img src={this.state.run.shape.image} className="runs-show-shape-img"/>,
              <GoogleMap center={{lat: this.state.run.start_latlng[0], lng: this.state.run.start_latlng[1]}} path={this.state.run.summary_polyline} />

            </div>}
          </div>

          <div className="col-md-6 runs-show-right">
            <div className="run-show-info-box">
              { this.state.run.user && <div>
                <h2>{this.state.run.user.username}</h2>,
              </div>}
            </div>

            <div className="run-show-comments-box">
              <h3>Comments</h3>
              { this.state.run.comments && <div>
                { this.state.run.comments.map(comment => {
                  return(
                    <div key={comment.id} className="run-show-comment-individual">
                      <p>{comment.content}</p>
                      <p><strong>@{comment.createdBy.username}</strong></p>
                    </div>
                  );
                })}
              </div>}


              {/* { this.state.runs.map(run => {
                return(
                  <div key={run.id} className="col-md-10 col-sm-10 col-xs-12">
                    <Link to={`/runs/${run.id}`}><h2>{run.shape.name}</h2></Link>
                    <p>Rating: {run.rating}</p>
                    <p>Runner: {run.user.username}</p>
                    <p>Start Time: {(run.date).substring(11, 16)}</p>
                    <p>Start Date: {(run.date).substring(0, 10)}</p>
                    {run.start_latlng && <GoogleMap center={{lat: run.start_latlng[0], lng: run.start_latlng[1]}} path={run.summary_polyline} />}
                  </div>
                );
              })} */}

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default RunsShow;
