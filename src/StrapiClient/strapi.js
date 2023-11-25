const baseURL =
  process.env.REACT_APP_API_URL || "https://strapi.evertech.software";

export const getInstallation = async (jwt) => {
  const response = await fetch(`${baseURL}/api/installations?populate=*`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  const data = await response.json();
  return data.data[0];
};
