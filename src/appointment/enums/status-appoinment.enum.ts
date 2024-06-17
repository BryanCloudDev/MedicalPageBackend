export enum Status {
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  CREATED = 'CREATED',
  NOT_ATTENDED = 'NOT ATTENDED'
}

export const statusTransitions: { [key in Status]: Status[] } = {
  [Status.CREATED]: [Status.CANCELLED, Status.COMPLETED, Status.NOT_ATTENDED],
  [Status.NOT_ATTENDED]: [],
  [Status.COMPLETED]: [],
  [Status.CANCELLED]: []
}
