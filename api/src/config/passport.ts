import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { prisma } from '../lib/db'
import { JWT_SECRET } from './env'

import { JwtPayload } from '../types/authTypes'

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not in env')
}

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
}

//.then to fix no missued promises

passport.use(
  new JwtStrategy(opts, (payload: JwtPayload, done) => {
    prisma.user
      .findUnique({ where: { id: payload.userId } })
      .then((user) => {
        if (user) return done(null, user)
        return done(null, false)
      })
      .catch((err) => done(err, false))
  })
)

export default passport
