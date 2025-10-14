
export const loadingStatus = {
  idle: 'idle',
  loading: 'loading',
  succeed: 'succeed',
  failed: 'failed',
  done: 'done',
}

export const validMail = mail => {
  return /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(mail);
}