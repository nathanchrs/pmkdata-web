
const schemas = {

  nim: {
    'type': 'integer',
    'minimum': 10000000,
    'maximum': 20000000,
    'errorMessage': 'NIM tidak valid'
  },

  username: {
    'type': 'string',
    'maxLength': 255,
    'pattern': '^[a-zA-Z0-9_]+$',
    'errorMessage': 'Username hanya boleh mengandung karakter alfanumerik dan underscore (_)'
  },

  email: {
    'type': 'string',
    'format': 'email',
    'maxLength': 255,
    'errorMessage': 'Email tidak valid'
  },

  password: {
    'type': 'string',
    'minLength': 6,
    'maxLength': 255,
    'errorMessage': 'Password minimal sepanjang 6 karakter'
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
