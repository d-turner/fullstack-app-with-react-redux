import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../../Loader/Loader';
import styles from '../styles.css';
import isoLangs from '../../../utils/isoLangs';
import BabelApi from '../../../utils/babelnet';

import FindReplace from '../../FindReplace/Containers';
import Comments from '../../Comments/Containers';

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

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.parseLangs();
    this.onSubmit = this.onSubmit.bind(this);
    this.lookup = this.lookup.bind(this);
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

  parseLangs() {
    const code1 = this.props.sourceLang.split('-')[0].toLowerCase();
    const code2 = this.props.targetLang.split('-')[0].toLowerCase();
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
      <div className={styles.parent}>
        <div className={`${styles.flexItem} ${styles.lexicon}`}>
          <h3>Lexicon</h3>
          <form onSubmit={this.onSubmit}>
            <label htmlFor="searchCheckbox">{this.state.sourceLang}</label>
            <label className={styles.switch} htmlFor="searchCheckbox">
              <input type="checkbox" id="searchCheckbox" name="searchCheckbox" />
              <div className={`${styles.slider} ${styles.round}`} />
            </label>
            <label htmlFor="searchCheckbox">{this.state.targetLang}</label>
            <input
              type="text" className={`${styles.typeahead}  ${styles.input}`}
              autoComplete="off" placeholder="Enter a word to search..."
              autoFocus="" aria-autocomplete="list" aria-owns="typeahead-2583-2457"
            />
          </form>
          <div className={styles.wrapper}>
            <div className={styles.flexItem}>
              <div className={styles.colwrapper}>
                <div className={`${styles.lexiconItem} ${styles.lexiconHeading}`}>
                  {this.state.sourceLang}
                </div>
                <div className={styles.lexiconTranslation}>
                  {this.state.sourceLemma}
                </div>
              </div>
            </div>
            <div className={styles.flexItem}>
              <div className={styles.colwrapper}>
                <div className={`${styles.lexiconItem} ${styles.lexiconHeading}`}>
                  {this.state.targetLang}
                </div>
                <div className={styles.lexiconTranslation}>
                  {this.state.targetLemma}
                </div>
              </div>
              {this.renderSpinner()}
            </div>
          </div>
          <Comments documentId={this.props.documentId} />
          <FindReplace documentId={this.props.documentId} />
        </div>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  lexicon: '',
  sourceLang: 'EN',
};

Sidebar.propTypes = {
  lexicon: PropTypes.string,
  sourceLang: PropTypes.string,
  targetLang: PropTypes.string.isRequired,
  documentId: PropTypes.number.isRequired,
};

export default Sidebar;
