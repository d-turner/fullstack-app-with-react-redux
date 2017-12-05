// import React, { Component } from 'react';
// import { sortableContainer, sortableElement, arrayMove, DragLayer } from '../../react-sortable-hoc';

// const dragLayer = new DragLayer();

// const SortableItem = sortableElement((props) => {
//   return (
//     <div onClick={props.onSelect} className={props.className}>
//       <span style={{ display: 'inline-block', width: '50px' }}>{props.item}</span>
//     </div>
//   );
// });

// const SortableListItems = sortableContainer(({ items }) =>
//   <div>
//     {items.map((value, index) => (
//       <SortableItem
//         key={index+'item'+value}
//         index={index}
//         item={value}
//       />
//     ))}
//   </div>,
// );

// const SortablePart = sortableElement(props =>
//   <div>
//     <div><span style={{ marginLeft: '50px' }}>{props.item.name}</span></div>
//     <SortableListItems
//       {...props}
//       items={props.item.items}
//       dragLayer={dragLayer}
//       distance={3}
//       helperClass={'selected'}
//       isMultiple
//       helperCollision={{ top: 0, bottom: 0 }}
//     />
//   </div>,
// );

// const SortableListParts = sortableContainer(({ items, onSortItemsEnd }) =>
//   <div style={{ height: '600px', overflow: 'auto' }}>
//     {items.map((value, index) => (
//       <SortablePart
//         key={index+'parts'+value}
//         index={index}
//         item={value}
//         id={index}
//         onMultipleSortEnd={onSortItemsEnd}
//       />
//     ))}
//   </div>,
// );


// export default class SortableComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       parts: props.parts,
//     };
//   }
//   onSortEnd({ oldIndex, newIndex }) {
//     this.setState({
//       parts: arrayMove(this.state.parts, oldIndex, newIndex),
//     });
//   }
//   onSortItemsEnd({ newListIndex, newIndex, items }) {
//     console.log(newListIndex, newIndex, items);
//     const parts = this.state.parts.slice();
//     const itemsValue = [];

//     items.forEach(item => {
//       itemsValue.push(parts[item.listId].items[item.id]);
//     });
//     for (let i = items.length - 1; i >= 0; i--) {
//       const item = items[i];
//       parts[item.listId].items.splice(item.id, 1);
//     }
//     parts[newListIndex].items.splice(newIndex, 0, ...itemsValue);
//     this.setState({
//       parts: parts,
//     });
//   }
//   render() {
//     const parts = this.state.parts;
//     return (
//       <div>
//         <SortableListParts
//           items={parts}
//           onSortEnd={this.onSortEnd.bind(this)}
//           onSortItemsEnd={this.onSortItemsEnd.bind(this)}
//           helperClass={'selected'} />
//       </div>
//     );
//   }
// }
