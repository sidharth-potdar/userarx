/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const putTags = `mutation PutTags($pk: String, $sk: String, $name: String, $color: String) {
  putTags(pk: $pk, sk: $sk, name: $name, color: $color) {
    pk
    sk
    name
    color
  }
}
`;
export const putSnips = `mutation PutSnips($pk: String, $sk: String) {
  putSnips(pk: $pk, sk: $sk) {
    pk
    sk
    text
    tag_id
  }
}
`;
