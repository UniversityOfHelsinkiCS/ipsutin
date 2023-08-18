import Entry from './Entry'
import Question from './Question'
import Recommendation from './Recommendation'
import Result from './Result'
import Survey from './Survey'
import User from './User'

Question.belongsTo(Survey)
Survey.hasMany(Question)

Recommendation.belongsTo(Survey)
Survey.hasMany(Recommendation)

Result.belongsTo(Survey)
Survey.hasMany(Result)

Entry.belongsTo(Survey)
Survey.hasMany(Result)

Entry.belongsTo(User)
User.hasMany(Entry)

export { Entry, Question, Recommendation, Result, Survey, User }
