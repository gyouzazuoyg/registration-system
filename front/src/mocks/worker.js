import { setupWorker } from 'msw';
import { handlers as apiHandlers } from './handler';

export const worker = setupWorker(...apiHandlers);
