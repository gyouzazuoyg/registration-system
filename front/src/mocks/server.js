import { setupServer } from 'msw/node';
import { handlers as apiHandlers } from './handler';

export const server = setupServer(...apiHandlers);
