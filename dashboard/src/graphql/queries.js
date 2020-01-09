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
    text
    tag_id
  }
}
`;
