export const Note = ({ content, date }) => {
  return (
    <li>
      <p>{content}</p>
      <small>{date}</small>
    </li>
  )
}
// export const Note = ({ title, body }) => {
//   return (
//     <li>
//       <p>{title}</p>
//       <small>{body}</small>
//     </li>
//   )
// }
