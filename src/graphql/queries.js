/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTags = `query GetTags($pk: String, $sk: String) {
  getTags(pk: $pk, sk: $sk) {
    pk
    sk
    name
    color
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
export const getProjects = `query GetProjects($pk: String, $sk: String, $creator: String) {
  getProjects(pk: $pk, sk: $sk, creator: $creator) {
    pk
    sk
    name
    creator
  }
}
`;
