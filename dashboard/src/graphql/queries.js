/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTags = `query GetTags($pk: String, $sk: String) {
  getTags(pk: $pk, sk: $sk) {
    pk
    sk
    name
  }
}
`;
export const getSnips = `query GetSnips($pk: String, $sk: String) {
  getSnips(pk: $pk, sk: $sk) {
    pk
    sk
    color
    date
    session_id
    session_name
    tag_id
    tag_text
    text
  }
}
`;
export const getProjects = `query GetProjects($pk: String, $sk: String) {
  getProjects(pk: $pk, sk: $sk) {
    pk
    sk
    name
    date
  }
}
`;
export const getUsers = `query GetUsers($pk: String, $sk: String) {
  getUsers(pk: $pk, sk: $sk) {
    pk
    sk
    email
    type
    name
    projects
  }
}
`;
