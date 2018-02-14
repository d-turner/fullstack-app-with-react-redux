import React from 'react';
import PropTypes from 'prop-types';

import styles from '../lexicon.scss';
import main from '../../../constants/main.scss';

function DisplayLexicon(props) {
  return (
    <div className={main.maxHeight}>
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
        <div style={{ textAlign: 'left', margin: '0 0 10px 0' }}>
          <input type="submit"
            text="Search"
            style={{
              background: 'white',
              color: 'black',
              border: 'solid 1px black',
            }} />
        </div>
      </form>
      <div className="flex two">
        <div className="half">
          <div className={`${styles.lexiconItem} ${styles.lexiconHeading}`}>
            {props.sourceLang}
          </div>
        </div>
        <div className="half">
          <div className={`${styles.lexiconItem} ${styles.lexiconHeading}`}>
            {props.targetLang}
          </div>
        </div>
        {props.renderSpinner()}
      </div>
      <div className={styles.results}>
        {props.result !== null ?
          props.result.map((data, index) => RenderResult(props.sourceCode, props.targetCode, data, index))
          : null}
      </div>
    </div>
  );
}

// returns the sense of an array
// alternative words
function findFirstLemma(lang, array) {
  for (let x = 0; x < array.length; x++) {
    if (array[x].language === lang) return array[x].lemma.split('_').join(' ');
  }
  return null;
}

// returns the gloss with the most amount of tokens
// gloss is the description of the word
function findFirstGloss(lang, array) {
  let tokenLength = 0;
  let gloss = null;
  for (let x = 0; x < array.length; x++) {
    if (array[x].language === lang && array[x].tokens.length >= tokenLength) {
      gloss = array[x];
      tokenLength = array[x].tokens.length;
    }
  }
  return gloss;
}


function RenderResult(sourceLang, targetLang, data, index) {
  const sourceGloss = findFirstGloss(sourceLang, data.glosses);
  const targetGloss = findFirstGloss(targetLang, data.glosses);
  const sourceLemma = findFirstLemma(sourceLang, data.senses);
  const targetLemma = findFirstLemma(targetLang, data.senses);
  console.log(sourceLang, targetLang);
  console.log(sourceGloss, sourceLemma, targetGloss, targetLemma);
  return (
    <div className="flex two" key={index}>
      <div className="half">
        {sourceGloss !== null ? (
          <div>
            {/* <p>{sourceGloss.sourceSense.split('_').join(' ')}</p> */}
            <p style={{ marginTop: '0px' }}>{sourceLemma}</p>
            <p>{sourceGloss.gloss}</p>
          </div>
        ) : null}
      </div>
      <div className="half">
        {targetGloss !== null ? (
          <div>
            {/* <p>{targetGloss.sourceSense.split('_').join(' ')}</p> */}
            <p style={{ marginTop: '0px' }}>{targetLemma}</p>
            <p>{targetGloss.gloss}</p>
          </div>
        ) : null}
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
  renderSpinner: PropTypes.func.isRequired,
};

export default DisplayLexicon;
