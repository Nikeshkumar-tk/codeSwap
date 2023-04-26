
export function getFormData(event: React.FormEvent<HTMLFormElement>) {
  const formData = new FormData(event.currentTarget);
  return Object.fromEntries(formData);
}
