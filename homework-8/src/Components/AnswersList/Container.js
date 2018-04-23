import { compose, withStateHandlers, withHandlers, withProps, lifecycle, branch, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { db } from '../../utils';

import AppLoader from '../Loaders/AppLoader';
import Component from './Component';

const mapStateToProps = state => ({
  user: state.user,
  answerSort: state.answerSort,
});


const votesByAnswerId = (votes, answerId) => votes.filter(vote => vote.answerId === answerId)

const divideVotes = votes => {
  const positive = votes.filter(vote => vote.isPositive).length;
  const negative = votes.length - positive;
  return { positive, negative };
};

const sort = (answers, answerSort, votes) => {
  let newAnswers = answers.slice();
  console.log(answerSort);
  switch (answerSort){
    case 'createdAt':
      return newAnswers.sort((a, b) => a.createdAt < b.createdAt);
    case 'best':
      return newAnswers.sort((a, b) => divideByAnswerId(votes, a._id).positive < divideByAnswerId(votes, b._id).positive);
    case 'worst':
      return newAnswers.sort((a, b) => divideByAnswerId(votes, a._id).negative < divideByAnswerId(votes, b._id).negative);
    default:
      throw new Error(`Aswer sorting type '${answerSort}' not exists`); 
  }
};

const divideByAnswerId = (votes, answerId) => divideVotes(votesByAnswerId(votes, answerId));


const prepareAnswers = ({ answers, answerSort, votes }) => sort(answers, answerSort, votes);

const enhance = compose(
  connect(mapStateToProps),
  withStateHandlers({ answers: [], users: [], votes: [], isFetching: true }),

  withRouter,

  lifecycle({
    componentWillMount() {
      this.interval = db.pooling(async () => {
        const questionId = this.props.match.params.questionId;

        let answers = await db.answers.find();
        answers = answers.filter(answer => answer.questionId === questionId);
        
        let votes = await db.votes.find();
        const answerIds = answers.map(a => a._id);
        votes = votes.filter(vote => answerIds.includes(vote.answerId));

        const users = await db.users.find();
        answers = sort(answers, this.props.answerSort, votes);
        console.log(answers);
        this.setState({ answers, votes, users, isFetching: false });
      });
    },
    componentWillUnmount() {
      clearInterval(this.interval);
    }
  }),

  branch(
    ({ isFetching }) => isFetching,
    renderComponent(AppLoader)
  ),

  withHandlers({
    onVote: ({ user }) => (answerId, isPositive) => {
      if (user) {
        db.votes.insert({
          answerId,
          isPositive,
          createdAt: new Date(),
          createdById: user._id,
        });
      }
    }
  }),
  //withProps(props => ({ sortedAnswers: prepareAnswers(props) })),
);


export default enhance(Component);
