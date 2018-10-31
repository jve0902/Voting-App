import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { vote, deletePoll } from "../store/actions/polls";
import { Pie } from "react-chartjs-2";

const color = () => {
  return (
    "#" +
    Math.random()
      .toString()
      .slice(2, 8)
  );
};

class Poll extends Component {
  constructor(props) {
    super(props);
    this.handlePollDelete = this.handlePollDelete.bind(this);
  }
  handlePollDelete() {
    const { deletePoll, id } = this.props;
    deletePoll(id);
  }

  render() {
    const { poll, vote } = this.props;

    const answers =
      poll.question &&
      poll.options.map(option => (
        <button
          className="vote-btn"
          onClick={() => vote(poll._id, { answer: option.title })}
          key={option._id}
        >
          {option.title}
        </button>
      ));

    const data = poll.options && {
      labels: poll.options.map(option => option.title),
      datasets: [
        {
          label: poll.question,
          backgroundColor: poll.options.map(option => color()),
          borderColor: "#323643",
          data: poll.options.map(option => option.votes)
        }
      ]
    };

    return (
      <div className="flex-basic-column" style={{ margin: "35px 0 0 0" }}>
        <h3>{poll.question}</h3>
        {answers}
        <Link to="/home">
          <button
            className="vote-btn delete-btn"
            onClick={this.handlePollDelete}
          >
            delete
          </button>
        </Link>
        {poll.options && <Pie data={data} />}
      </div>
    );
  }
}

export default connect(
  state => ({
    poll: state.currentPoll,
    auth: state.auth
  }),
  { vote, deletePoll }
)(Poll);
