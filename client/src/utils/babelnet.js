import axios from 'axios';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const key = 'ad58eca6-d462-4f61-8f11-cc07f82590c0';
const headers = new Headers({
  Origin: '/',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Accept-Encoding': 'gzip, deflate',
  'Content-Type': 'application/json',
});

export const BabelNet = {

  // returns the current babelnet version
  // { "version": "V3_7" }
  getVersion: `https://babelnet.io/v4/getVersion?key=${key}`,



  // returns babelnet synset ids for word
  // [ { "id": "bn:00615676n" }, { "id": "bn:03740610n" }, ... ]
  // Word   => Word to lookup
  // lang   => language of the source word
  // pos    => 'NOUN', 'VERB', etc
  // source => 'WIKT', 'WIKIDATA', etc
  getSynsetIds:
  (word, sourceLang, lang2) => `https://babelnet.io/v4/getSynsetIds?word=${word}&langs=${sourceLang}&filterLangs=${sourceLang}&filterLangs=${lang2}&key=${key}`,



  // returns babelnet senses for synset id
  /*
    [ { "lemma": "Apple_System_on_Chips", "simpleLemma": "Apple_System_on_Chips", "source": "WIKIRED",
       "sensekey": "", "sensenumber": 0,  "frequency": 0, "position": 1, "language": "EN", "pos": "NOUN",
       "synsetID": { "id": "bn:14792761n", "pos": "NOUN", "source": "BABELNET" },
       "translationInfo": "",
       "pronunciations": { "audios": [], "transcriptions": [] }
     }, ... ]
  */
  getSynset: (synsetId, lang1, lang2) =>
  `https://babelnet.io/v4/getSynset?id=${synsetId}&filterLangs=${lang1}&filterLangs=${lang2}&key=${key}`,



  // return babelnet senses of a given word
  /*
   [ { "lemma": "BabelNet", "simpleLemma": "BabelNet", "source": "WIKI", "sensekey": "", "sensenumber": 0,
       "frequency": 0, "position": 1, "language": "EN", "pos": "NOUN",
       "synsetID": { "id": "bn:03083790n", "pos": "NOUN", }, "translationInfo": "",
       "pronunciations": { "audios": [], "transcriptions": [] },
       "freebaseId": "0n5v3cj"
  }, ... ]
  */
  getSenses: (word, sourceLang, lang2) => `https://babelnet.io/v4/getSenses?word=${word}&lang=${sourceLang}&filterLangs=${sourceLang}&filterLangs=${lang2}&key=${key}`,



  // return babelnet ids for resource identifier
  // [ { "id": "bn:03083790n", "pos": "NOUN", "source": "BABELNET" }, ...]
  getSynsetIdsFromResourceID: (word, lang, pos, source) =>
  `https://babelnet.io/v4/getSynsetIdsFromResourceID?id=${word}&lang=${lang}&pos=${pos}&source=${source}&key=${key}`,


  // return all neighbours of a specific BabelSynset
  /* [ { "language": "EN",
         "pointer": { "fSymbol": "r", "name": "Semantically related form", "shortName": "related",
                      "relationGroup": "OTHER", "isAutomatic": false },
         "target": "bn:00027425n", "weight": 0.0, "normalizedWeight": 0.0
       }, ... ]
  */
  getEdges: synsetId => `https://babelnet.io/v4/getEdges?id=${synsetId}&key=${key}`,
};

/*
  Error message example:
  HTTP/1.1 400 Bad Request
  Content-Length: 52

  {"message":"Wrong parameters."}
*/

export function test() {
  const url = BabelNet.getSynset('bn:00005055n');

  fetch(proxyUrl + url, {
    method: 'GET',
    compress: true,
    headers,
  }).then((res) => {
    console.log(res);
    res.json().then((json) => {
      console.log(json);
    });
  });
}

const BabelApi = {
  lookup: (word, source, target, cb) => {
    const url = BabelNet.getSynsetIds(word, target, source);
    axios({
      url,
      mode: 'no-cors',
      method: 'GET',
      compress: true,
      headers,
    }).then(response => cb(response));
  },

  find: (json, source, target, cb) => {
    const url = BabelNet.getSynset(json[0].id, target, source);
    axios({
      url,
      mode: 'no-cors',
      method: 'GET',
      compress: true,
      headers,
    }).then(response => cb(response));
  },

  lookupWord: (word, target, source, cb) => {
    const url = BabelNet.getSenses(word, target, source);
    console.log(url);
    axios({
      url,
      mode: 'no-cors',
      method: 'GET',
      compress: true,
      headers,
    }).then(response => cb(response));
  },
};

export default BabelApi;
/*
  BabelNet Readme:

  BabelSynset
  BabelSynsets (i.e. semantic interpretations) associated to a word or term.
  You can add more languages to the lookup using:
  'filterLangs=DE&filterLangs=FR' in the request

  BabelSynsetId
  Given a specific BabelSynset of home (bn:00000356n), the objective
  is to retrieve all specific BabelSenses it includes.
  Return object:
  response['senses'] => list of sense objects
  sense['lenna']     => sense value
  sense['language]   => language
  sense['source']    => source

  Edges
  Given a specific BabelSynset of home (bn:00044492n), the
  objective is to retrieve all neighbouring BabelSynsets in the
  semantic network.
  Return object:
  response           => list of 'edge' objects
  edge['pointer']    => pointer object
  pointer['target']  => id of target synset
  pointer['name']    => relation name/description
  pointer['group']   => relation group

*/
