// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ApplicationStatus, Cart, Course, MarkerApplication } = initSchema(schema);

export {
  ApplicationStatus,
  Cart,
  Course,
  MarkerApplication
};