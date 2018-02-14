import React from 'react';
import PropTypes from 'prop-types';

import isoLangs from '../../../utils/isoLangs';
import BabelApi from '../../../utils/babelnet';
import Display from '../Presentation/DisplayLexicons';
import Loader from '../../Loader/Loader';

class Lexicon extends React.Component {
  constructor(props) {
    super(props);
    const { documents, documentId } = props;
    const { sourceLang, targetLang } = documents[documentId].xliff;
    this.parseLangs(sourceLang, targetLang);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lexicon !== this.props.lexicon) {
      this.lookup(this.props.lexicon);
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    // if checked searching in target language
    // if not checked searching in source language
    const value = encodeURI(event.target[1].value.trim());
    if (!event.target[0].checked) {
      this.lookup(value);
    } else {
      this.lookup(value, this.state.sourceCode, this.state.targetCode);
    }
  }

  parseLangs(sourceLang, targetLang) {
    const code1 = sourceLang.split('-')[0].toLowerCase();
    const code2 = targetLang.split('-')[0].toLowerCase();
    const obj1 = isoLangs[code1];
    const obj2 = isoLangs[code2];
    if (obj1 === undefined) console.warn('Source language not defined');
    if (obj2 === undefined) console.warn('Target  language not defined');
    this.state = {
      sourceLang: obj1.name,
      sourceCode: code1.toUpperCase(),
      targetLang: obj2.name,
      targetCode: code2.toUpperCase(),
      loading: false,
      result: null,
      lexicon: this.props.lexicon,
    };
  }

  lookup = (lexicon, sourceLang = this.state.targetCode, targetLang = this.state.sourceCode) => {
    const selectedText = lexicon.trim();
    const loading = true;
    this.setState({ loading });
    BabelApi.lookup(selectedText, sourceLang, targetLang)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        if (data.message) throw new Error(data.message);
        const promises = data.map(json => BabelApi.find(json.id, sourceLang, targetLang));
        return Promise.all(promises);
      })
      .then((values) => {
        let result = null;
        let results = [];
        values.map((response) => {
          results.push(response.data);
          return 1;
        });
        return results;
      })
      .then((result) => {
        if (result !== null) {
          this.setState({ loading: false, result });
        }
        else {
          this.setState({ loading: false, result: null });
        }
      })
      .catch((error) => {
        this.setState({ loading: false, result: null });
      });
    // BabelApi.lookupWord(selectedText, sourceLang, targetLang, ((res) => {
    //   console.log(res);
    //   loading = false;
    //   let sourceLemma = findFirstLemma(this.state.sourceCode, res.data);
    //   let targetLemma = findFirstLemma(this.state.targetCode, res.data);
    //   if (!res.data || !sourceLemma) {
    //     sourceLemma = 'Sense not found';
    //   }
    //   if (!res.data || !targetLemma) {
    //     targetLemma = 'Sense not found';
    //   }
    //   this.setState({ loading, sourceLemma, targetLemma });
    // }));
  }
  renderSpinner = () => {
    if (this.state.loading) {
      return (<Loader />);
    }
    return (<div />);
  }

  render() {
    return (
      <Display
        onSubmit={this.onSubmit}
        sourceLang={this.state.sourceLang}
        sourceCode={this.state.sourceCode}
        targetLang={this.state.targetLang}
        targetCode={this.state.targetCode}
        renderSpinner={this.renderSpinner}
        result={this.state.result}
      />
    );
  }
}

Lexicon.defaultProps = {
  lexicon: '',
};

Lexicon.propTypes = {
  lexicon: PropTypes.string,
  documents: PropTypes.objectOf(PropTypes.any).isRequired,
  documentId: PropTypes.string.isRequired,
};

export default Lexicon;
