const baseURL = process.env.REACT_APP_API_URL || "http://localhost:1337";

export const getInstallation = async ({
  jwt,
  repositories = false,
  repositoryConfigs = false,
}) => {
  const query = [];
  if (repositories) {
    query.push("populate[repositories]=*");
  }
  if (repositoryConfigs) {
    query.push("populate[repository_configurations][populate][0]=repository");
  }
  const response = await fetch(
    `${baseURL}/api/installations${query.length ? "?" + query.join("&") : ""}}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  const data = await response.json();
  return data.data[0];
};
