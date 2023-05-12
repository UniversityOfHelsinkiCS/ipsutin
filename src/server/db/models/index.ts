import Survey from './Survey'
import Question from './Question'
import Recommendation from './Recommendation'
import Result from './Result'
import User from './User'
import Entry from './Entry'

Question.belongsTo(Survey)
Survey.hasMany(Question)

Recommendation.belongsTo(Survey)
Survey.hasMany(Recommendation)

Result.belongsTo(Survey)
Survey.hasMany(Result)

Entry.belongsTo(Survey)
Survey.hasMany(Result)

export { Survey, Question, Recommendation, Result, User, Entry }
