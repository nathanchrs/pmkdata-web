
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

export function enumText(enums, value) {
  return enums.find(item => item.value === value).text;
}