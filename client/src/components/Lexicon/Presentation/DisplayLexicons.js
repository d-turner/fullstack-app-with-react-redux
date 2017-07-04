import React from 'react';
import PropTypes from 'prop-types';

import styles from '../lexicon.scss';

function DisplayLexicon(props) {
  return (
    <div style={{ height: '100%' }}>
      <h3>Lexicon</h3>
      <form className={styles.form} onSubmit={props.onSubmit}>
        <label htmlFor="searchCheckbox"><h4>{props.sourceLang}</h4></label>
        <label className={styles.switch} htmlFor="searchCheckbox">
          <input type="checkbox" id="searchCheckbox" name="searchCheckbox"
            aria-label="language selector switch"
          />
          <div className={`${styles.slider} ${styles.round}`} />
        </label>
        <label htmlFor="searchCheckbox"><h4>{props.targetLang}</h4></label>
        <input
          type="text" className={styles.input}
          autoComplete="off" placeholder="Enter a word to search..."
          autoFocus="" aria-autocomplete="list" aria-owns="typeahead-2583-2457"
          aria-label="lexicon search input"
        />
      </form>
      <div className={styles.wrapper}>
        <div className={styles.flexItem}>
          <div className={styles.colwrapper}>
            <div className={`${styles.lexiconItem} ${styles.lexiconHeading}`}>
              {props.sourceLang}
            </div>
            <div className={styles.lexiconTranslation}>
              {props.sourceLemma}
            </div>
          </div>
        </div>
        <div className={styles.flexItem}>
          <div className={styles.colwrapper}>
            <div className={`${styles.lexiconItem} ${styles.lexiconHeading}`}>
              {props.targetLang}
            </div>
            <div className={styles.lexiconTranslation}>
              {props.targetLemma}
            </div>
          </div>
          {props.renderSpinner()}
        </div>
      </div>
    </div>
  );
}

DisplayLexicon.defaultProps = {
  sourceLemma: '',
  targetLemma: '',
};

DisplayLexicon.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  sourceLang: PropTypes.string.isRequired,
  targetLang: PropTypes.string.isRequired,
  sourceLemma: PropTypes.string,
  targetLemma: PropTypes.string,
  renderSpinner: PropTypes.func.isRequired,
}
export default DisplayLexicon;
