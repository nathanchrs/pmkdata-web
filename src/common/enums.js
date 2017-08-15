
export const userRoles = [
  { key: 'admin', value: 'admin', text: 'Administrator' },
  { key: 'supervisor', value: 'supervisor', text: 'Supervisor' },
  { key: 'user', value: 'user', text: 'Pengguna' }
];

export const userStatuses = [
  { key: 'active', value: 'active', text: 'Aktif' },
  { key: 'awaiting_validation', value: 'awaiting_validation', text: 'Menunggu validasi' },
  { key: 'disabled', value: 'disabled', text: 'Tidak aktif' }
];

export const genderEnum = [
  { key: 'male', value: 'male', text: 'Laki-laki' },
  { key: 'female', value: 'female', text: 'Perempuan' }
];

export const departmentInItb = [
  { key: 'FITB', value: 'FITB', text: 'Fakultas Ilmu Teknologi Kebumian' },
  { key: 'FMIPA', value: 'FMIPA', text: 'Fakultas Matematika dan Ilmu Pengetahuan Alam' },
  { key: 'FSRD', value: 'FSRD', text: 'Fakultas Seni Rupa dan Desain' },
  { key: 'FTI', value: 'FTI', text: 'Fakultas Teknologi Industri' },
  { key: 'FTMD', value: 'FTMD', text: 'Fakultas Teknik Mesin dan Dirgantara' },
  { key: 'FTTM', value: 'FTTM', text: 'Fakultas Teknik Pertambangan dan Perminyakan' },
  { key: 'FTSL', value: 'FTSL', text: 'Fakultas Teknik Sipil dan Lingkungan' },
  { key: 'SAPPK', value: 'SAPPK', text: 'Sekolah Arsitektur, Perencanaan dan Pengembangan Kebijakan' },
  { key: 'SBM', value: 'SBM', text: 'Sekolah Bisnis dan Manajemen' },
  { key: 'SF', value: 'SF', text: 'Sekolah Farmasi' },
  { key: 'SITH-S', value: 'SITH-S', text: 'Sekolah Ilmu dan Teknologi Hayati - Program Sains' },
  { key: 'SITH-R', value: 'SITH-R', text: 'Fakultas Ilmu Teknologi Kebumian - Program Rekayasa' },
  { key: 'STEI', value: 'STEI', text: 'Sekolah Teknik Elektro dan Informatika' }
];

export function enumText (enums, value) {
  return enums.find(item => item.value === value).text;
}
