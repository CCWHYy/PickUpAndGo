export const isRequestSuccessed = (request) => !request.error && !request.pending && request.data;
