// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Interests = {
  "RUNNING": "RUNNING",
  "BODYBUILDING": "BODYBUILDING",
  "YOGA": "YOGA"
};

const { Match, User } = initSchema(schema);

export {
  Match,
  User,
  Interests
};