import React from 'react';
import PropTypes from 'prop-types';

import isoLangs from '../../../utils/isoLangs';
import BabelApi from '../../../utils/babelnet';
import Display from '../Presentation/DisplayLexicons';
import Loader from '../../Loader/Loader';

function findFirstLemma(lang, array) {
  for (let x = 0; x < array.length; x++) {
    if (array[x].language === lang) return array[x].lemma.split('_').join(' ');
  }
  return '';
}

function findFirstGloss(lang, array) {
  for (let x = 0; x < array.length; x++) {
    if (array[x].language === lang) return array[x].gloss;
  }
  return '';
}

class Lexicon extends React.Component {
  constructor(props) {
    super(props);
    const { documents, documentId } = props;
    const sourceLang = documents[documentId].xliff.sourceLang;
    const targetLang = documents[documentId].xliff.targetLang;
    this.parseLangs(sourceLang, targetLang);

    this.onSubmit = this.onSubmit.bind(this);
    this.lookup = this.lookup.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lexicon !== this.props.lexicon) {
      this.lookup(this.props.lexicon);
    }
  }

  onSubmit(event) {
    event.preventDefault();
    // if checked searching in target language
    // if not checked searching in source language
    const value = encodeURI(event.target[1].value.trim());
    if (event.target.childNodes[1].childNodes[0].checked) {
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
      status: '',
      lexicon: this.props.lexicon,
    };
  }

  lookup(lexicon, sourceLang = this.state.targetCode, targetLang = this.state.sourceCode) {
    const selectedText = lexicon.trim();
    let loading = true;
    this.setState({ loading, lexicon: selectedText });
    BabelApi.lookupWord(selectedText, sourceLang, targetLang).then((res) => {
      res.json().then((json) => {
        loading = false;
        let sourceLemma = findFirstLemma(this.state.sourceCode, json);
        let targetLemma = findFirstLemma(this.state.targetCode, json);
        if (!json || !sourceLemma) {
          sourceLemma = 'Sense not found';
        }
        if (!json || !targetLemma) {
          targetLemma = 'Sense not found';
        }
        this.setState({ json, loading, sourceLemma, targetLemma });
      });
    });
  }
  renderSpinner() {
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
        targetLang={this.state.targetLang}
        sourceLemma={this.state.sourceLemma}
        targetLemma={this.state.targetLemma}
        renderSpinner={this.renderSpinner}
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
  documentId: PropTypes.number.isRequired,
};

export default Lexicon;
