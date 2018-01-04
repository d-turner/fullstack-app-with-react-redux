import React from 'react';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';
// TODO: Store and Fetch table fields (Segment Count, Completed Segments, Word Count, etc)
// TODO: Implement document order on sort end
import store from '../../../store';
import { setDocumentOrder } from '../ActionCreators/DocumentActions';
import Document from './Document';
// import styles from '../documents.scss';
import main from '../../../constants/main.scss';

export default class DocumentTable extends React.Component {
  sortableGroupDecorator = (componentBackingInstance) => {
    // check if backing instance not null
    if (componentBackingInstance) {
      const options = {
        draggable: 'tr', // Specifies which items inside the element should be sortable
        sort: true,
        animation: 300,
        onEnd: this.onEnd,
      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  onEnd = (event) => {
    if (this.props.documents[event.item.firstChild.dataset.key].meta !== null && event.oldIndex !== event.newIndex) {
      store.dispatch(setDocumentOrder(this.props.documents[event.item.firstChild.dataset.key], event.newIndex));
    }
  };

  renderDocument = (doc, key) =>
    (<Document document={doc} id={key} key={key} value={key} />);

  render() {
    const sortable = [];
    for (const document in this.props.documents) {
      sortable.push(this.props.documents[document]);
    }
    sortable.sort((a, b) => {
      if (a.meta === null || b.meta === null) return 0;
      return a.meta.listOrder - b.meta.listOrder;
    });
    return (
      <table id="documentList" className={main.fullWidth}>
        <caption>
          <h3>Users Document List</h3>
        </caption>
        <thead>
          <tr>
            <th scope="col">
              <div className="document-list-utility" />
              <div className="th-document-ellipsis">Document ID</div>
            </th>
            <th scope="col">
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
          {/* Object.keys(this.props.documents).map(key => this.renderDocument(this.props.documents[key], key)) */}
          { sortable.map(doc => this.renderDocument(doc, doc.saved_name)) }
        </tbody>
      </table>
    );
  }
}

DocumentTable.propTypes = {
  documents: PropTypes.objectOf(PropTypes.any).isRequired,
};
