// Get settings from school Db
const apiUri = process.env.NEXT_PUBLIC_API_URI || 'http://localhost:3000${apiUri}';

export const getSchoolSettings = async (schoolId: string) => {
  const response = await fetch(`${apiUri}schools/${schoolId}/settings`);
  const settings = await response.json();
  return settings;
};
