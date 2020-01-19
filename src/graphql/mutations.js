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
export const putSnips = `mutation PutSnips(
  $pk: String
  $sk: String
  $color: String
  $date: String
  $session_id: String
  $session_name: String
  $tag_id: String
  $tag_text: String
  $text: String
) {
  putSnips(
    pk: $pk
    sk: $sk
    color: $color
    date: $date
    session_id: $session_id
    session_name: $session_name
    tag_id: $tag_id
    tag_text: $tag_text
    text: $text
  ) {
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
