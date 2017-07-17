'use strict';

const schemas = {

  nim: {
    'type': 'integer',
    'minimum': 10000000,
    'maximum': 20000000
  },

  username: {
    'type': 'string',
    'maxLength': 255,
    'pattern': '^[a-zA-Z0-9_]+$'
  },

  email: {
    'type': 'string',
    'format': 'email',
    'maxLength': 255
  },

  password: {
    'type': 'string',
    'minLength': 6,
    'maxLength': 255
  },

  role: {
    'type': 'string',
    'enum': ['admin', 'supervisor', 'user']
  },

  userStatus: {
    'type': 'string',
    'enum': ['active', 'awaiting-validation', 'disabled']
  },

  pagingAndSortingProperties: {
    'page': {
      'type': 'integer',
      'minimum': 1
    },
    'perPage': {
      'type': 'integer',
      'minimum': 1
    },
    'sort': {
      'type': 'string'
    }
  },

  searchingProperties: {
    'search': {
      'type': 'string'
    }
  }

};

export default schemas;
