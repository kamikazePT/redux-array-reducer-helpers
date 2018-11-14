module.exports =  {
  'transform': {
    '^.+\\.js$': 'babel-jest'
  },
  'testRegex': '(\\.(test|spec))\\.(js)$',
  'moduleFileExtensions': [
    'js'
  ],
  'moduleNameMapper': {
    '@/(.*)$': '<rootDir>/src/$1'
  },
  'moduleDirectories': [
    'node_modules'
  ],
  'verbose': true
};