const getEnvVariable = (name: keyof ImportMetaEnv) => {
  const value = import.meta.env[name];
  if (!value) throw new Error(`Environment variable missing ${name}`);
  return value;
};

export const config = {
  backendUrl: getEnvVariable("VITE_BACKEND_URL"),
};
