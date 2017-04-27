import React, { PropTypes } from 'react';

const Home = text => (
  <div className="home">
    <h1>Hello {text}</h1>
  </div>
);

Home.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Home;
// export class Other extends React.Component {
//   render() {
//     return (
//       <div>
//         <h2>Others Here</h2>
//         <button
//           onClick={() => {
//             store.dispatch({
//               type: 'ADD_TODO',
//               text: 'text',
//               id: 1,
//             });
//           }}
//         />
//         {this.props.todos.map(todo =>
//           <li key={todo.id}>
//             {todo.text}
//           </li>
//         )}
//       </div>
//     );
//   }
// }

export const Main = function() {
  return (
    <div>
      <h1>Kanjingo</h1>
    </div>
  );
};

export const Single = function() {
  return (
    <div>
      <h1>Single page</h1>
    </div>
  );
};
