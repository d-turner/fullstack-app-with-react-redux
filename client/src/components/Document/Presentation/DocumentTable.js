import React from 'react';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';

import store from '../../../store';
import { setDocumentOrder } from '../ActionCreators/DocumentActions';
import Document from './Document';
import main from '../../../constants/main.scss';

export default class DocumentTable extends React.Component {
  state = { sortable: [] };

  componentWillReceiveProps(nextProps) {
    const sortable = [];
    const keys = Object.keys(nextProps.documents);
    // loop through the documents and add any new one the sortable array
    for (let i = 0; i < keys.length; i++) {
      if (this.state.sortable[keys[i]] === undefined) {
        sortable.push(nextProps.documents[keys[i]]);
      }
    }
    // sort the array based on the list order
    // TODO: provide a parameter in the state for sorting the array
    // e.g sort on name, created date, etc
    sortable.sort((a, b) => {
      if (a.meta === null || b.meta === null) return 0;
      return a.meta.listOrder - b.meta.listOrder;
    });
    this.setState({ sortable });
  }

  onEnd = (evt, event) => {
    const draggedIndex = evt.dragged.dataset.index;
    let targetIndex = event.target.dataset.index;
    const doc1 = this.state.sortable[draggedIndex];
    let doc2 = this.state.sortable[targetIndex];
    // parameters: document, newIndex
    if (doc2 === undefined) {
      targetIndex = event.path[1].dataset.index;
      doc2 = this.state.sortable[targetIndex];
    }
    if (doc1 === undefined || doc2 === undefined) return;
    store.dispatch(setDocumentOrder(doc1, targetIndex));
    store.dispatch(setDocumentOrder(doc2, draggedIndex));
  };

  sortableGroupDecorator = (componentBackingInstance) => {
    // check if backing instance not null
    if (componentBackingInstance) {
      const options = {
        draggable: 'tr', // Specifies which items inside the element should be sortable
        sort: true,
        animation: 300,
        handle: ".my-handle", // Drag handle selector within list items
        onMove: this.onEnd,
      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  sortTable = (type) => {
    switch (type) {
      case ('id'): {
        const { sortable } = this.state;
        sortable.sort((a, b) => {
          return a.id - b.id;
        });
        this.setState({ sortable });
        break;
      }
      case ('name'): {
        const { sortable } = this.state;
        sortable.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        this.setState({ sortable });
        break;
      }
      case ('date_1'): {
        const { sortable } = this.state;
        sortable.sort((a, b) => {
          return Date.parse(a.created_at) - Date.parse(b.created_at);
        });
        this.setState({ sortable });
        break;
      }
      default:
        break;
    }
  };

  renderDocument = (doc, key, index) =>
    (<Document document={doc} id={key} key={key} value={key} index={index} />);

  render() {
    return (
      <table id="documentList" className={main.fullWidth} style={{ color: 'rgba(51,51,51,1)'}}>
        <caption>
          <h3>Users Document List</h3>
        </caption>
        <thead>
          <tr>
            <th scope="col" className={main.clickable}>
              <div className="document-list-utility" />
              <div className="th-document-ellipsis" />
            </th>
            <th scope="col" className={main.clickable} onClick={() => this.sortTable('id')}>
              <div className="document-list-utility" />
              <div className="th-document-ellipsis">Document ID</div>
            </th>
            <th scope="col" className={main.clickable} style={{ minWidth: '172px' }} onClick={() => this.sortTable('name')}>
              <div className="document-list-utility" />
              <div className="th-document-ellipsis">Document name</div>
            </th>
            <th scope="col">
              <div className="document-list-utility" />
              <div className="th-document-ellipsis">Segment Count</div>
            </th>
            <th scope="col">
              <div className="document-list-utility" />
              <div className="th-document-ellipsis">Completed Segments</div>
            </th>
            <th scope="col" className={main.clickable} onClick={() => this.sortTable('date_1')}>
              <div className="document-list-utility" />
              <div className="th-document-ellipsis">Created Date</div>
            </th>
            <th scope="col">
              <div className="document-list-utility" />
              <div className="th-document-ellipsis">Last Edited</div>
            </th>
            <th scope="col">
              <div className="document-list-utility" />
              <div className="th-document-ellipsis">Word Count</div>
            </th>
            <th scope="col">
              <div className="document-list-utility" />
              <div className="th-document-ellipsis">Delete</div>
            </th>
            <th scope="col">
              <div className="document-list-utility" />
              <div className="th-document-ellipsis">Download</div>
            </th>
          </tr>
        </thead>
        <tbody ref={this.sortableGroupDecorator} id="items">
          { this.state.sortable.map((doc, index) => this.renderDocument(doc, doc.saved_name, index)) }
        </tbody>
      </table>
    );
  }
}

DocumentTable.propTypes = {
  documents: PropTypes.objectOf(PropTypes.any).isRequired,
};
