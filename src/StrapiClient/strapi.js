const baseURL = process.env.REACT_APP_API_URL || "http://localhost:1337";

export const getInstallation = async ({
  jwt,
  repositories,
  repositoryConfigs,
}) => {
  const query = [];
  if (repositories) {
    query.push("populate[repositories]=*");
  }
  if (repositoryConfigs) {
    query.push("populate[repository_configurations][populate][0]=repository");
  }
  const response = await fetch(
    `${baseURL}/api/installations${query.length ? "?" + query.join("&") : ""}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  const data = await response.json();
  return data.data;
};

export const PostRepoConfiguratiion = async (
  repoID,
  cron,
  privatePosts,
  jwt
) => {
  const response = await fetch(`${baseURL}/api/repository-configurations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      data: {
        repository: repoID,
        cron: cron,
        private: privatePosts,
      },
    }),
  });
  const data = await response.json();
  return data;
};

export const PutRepoConfiguratiion = async (
  configurationID,
  cron,
  privatePosts,
  jwt
) => {
  const response = await fetch(
    `${baseURL}/api/repository-configurations/${configurationID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        data: {
          cron: cron,
          private: privatePosts,
        },
      }),
    }
  );
  const data = await response.json();
  return data;
};

export const DeleteRepoConfiguratiion = async (configurationID, jwt) => {
  const response = await fetch(
    `${baseURL}/api/repository-configurations/${configurationID}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const GetGitBlogPostByID = async (id, jwt) => {
  const response = await fetch(`${baseURL}/api/git-blog-posts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  const data = await response.json();
  return data;
};

export const GetGitBlogPosts = async (jwt) => {
  const response = await fetch(`${baseURL}/api/git-blog-posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  const data = await response.json();
  return data;
};
