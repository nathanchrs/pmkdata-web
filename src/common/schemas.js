
const schemas = {

  auto_id: {
    'type': 'integer',
    'minimum': 0,
    'errorMessage': 'Pilihan harus memiliki ID yang valid'
  },

  varchar: (length) => {
    let schema = {
      'type': 'string'
    };

    if (length) {
      schema.maxLength = length;
      schema.errorMessage = 'Panjang input maksimal ' + length.toString() + ' karakter';
    }
    return schema;
  },

  text: {
    'type': 'string'
  },

  department: {
    'type': 'string',
    'enum': ['FITB', 'FMIPA', 'FSRD', 'FTI', 'FTMD', 'FTTM', 'FTSL', 'SAPPK', 'SBM', 'SF', 'SITH', 'STEI'],
    'errorMessage': 'Fakultas tidak valid'
  },

  datetime: {
    'type': 'string',
    'format': 'date-time',
    'errorMessage': 'Tanggal dan/atau waktu tidak valid'
  },

  date: {
    'type': 'string',
    'format': 'date',
    'errorMessage': 'Tanggal tidak valid'
  },

  year: {
    'type': 'integer',
    'minimum': 1990,
    'maximum': 2089,
    'errorMessage': 'Tahun tidak valid'
  },

  gender: {
    'type': 'string',
    'enum': ['male', 'female']
  },

  phone: {
    'type': 'string',
    'maxLength': 16,
    'errorMessage': 'Nomor telepon tidak valid'
  },

  line: {
    'type': 'string',
    'maxLength': 32,
    'pattern': '^[a-zA-Z0-9@!#*+=/.,<>?~_-]+$',
    'errorMessage': 'Username LINE hanya boleh mengandung karakter alfanumerik, @ dan underscore (_)'
  },

  nim: {
    'type': ['integer', 'null'],
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
    'minLength': 5,
    'maxLength': 255,
    'errorMessage': 'Password minimal sepanjang 6 karakter'
  },

  userStatus: {
    'type': 'string',
    'enum': ['active', 'awaiting_validation', 'disabled']
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
