const getEnvVariable = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`Environment variable missing ${name}`);
  return value;
};

export const config = {
  socketPath: getEnvVariable("SOCKET_PATH"),
};
