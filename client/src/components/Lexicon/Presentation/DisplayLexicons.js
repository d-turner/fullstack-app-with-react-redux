import React from 'react';
import PropTypes from 'prop-types';

import styles from '../lexicon.scss';
import main from '../../../constants/main.scss';

function DisplayLexicon(props) {
  return (
    <div style={{ height: '100%' }}>
      <h3 className={main.clearMarginLeft}>Lexicon</h3>
      <form className={styles.form} onSubmit={props.onSubmit}>
        <label htmlFor="searchCheckbox">
          {props.sourceLang}
          <div className={styles.switch}>
            <input
              id="searchCheckbox"
              type="checkbox"
              name="searchCheckbox"
              aria-label="language selector switch"
            />
            <div className={`${styles.slider} ${styles.round}`} />
          </div>
          {props.targetLang}
        </label>
        <input
          type="text" className={styles.input}
          autoComplete="off" placeholder="Enter a word to search..."
          autoFocus="" aria-autocomplete="list"
          aria-label="lexicon search input"
        />
      </form>
      <div className="flex two">
        <div className="half">
          <div className={`${styles.lexiconItem} ${styles.lexiconHeading}`}>
            {props.sourceLang}
          </div>
          <div className={styles.lexiconTranslation}>
            {props.sourceLemma}
          </div>
        </div>
        <div className="half">
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
};

export default DisplayLexicon;
