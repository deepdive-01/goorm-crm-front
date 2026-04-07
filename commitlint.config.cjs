module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-pattern': [2, 'always', /^\[(FIX|UPDATE|ADD|FEAT)\] .+$/],
  },
};
